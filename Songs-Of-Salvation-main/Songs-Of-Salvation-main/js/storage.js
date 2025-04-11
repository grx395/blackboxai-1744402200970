class StorageManager {
    constructor() {
        this.songs = [];
        this.audioData = {};
        this.initialized = false;
        this.initializeStorage();
    }

    async initializeStorage() {
        try {
            const data = await githubStorage.initialize();
            this.songs = data.songs;
            this.audioData = data.audioData;
            this.initialized = true;
        } catch (error) {
            console.error('Error initializing storage:', error);
            // Fallback to localStorage if GitHub storage fails
            this.songs = JSON.parse(localStorage.getItem('songs')) || [];
            this.audioData = JSON.parse(localStorage.getItem('audioData')) || {};
            this.initialized = true;
        }
    }

    async waitForInitialization() {
        if (!this.initialized) {
            await new Promise(resolve => {
                const checkInit = () => {
                    if (this.initialized) {
                        resolve();
                    } else {
                        setTimeout(checkInit, 100);
                    }
                };
                checkInit();
            });
        }
    }

    async saveSongs() {
        try {
            await githubStorage.saveSongsData({
                songs: this.songs,
                audioData: this.audioData
            });
        } catch (error) {
            console.error('Error saving to GitHub:', error);
            // Fallback to localStorage
            localStorage.setItem('songs', JSON.stringify(this.songs));
            localStorage.setItem('audioData', JSON.stringify(this.audioData));
        }
    }

    addSong(song, audioData = null, audioUrl = null) {
        song.id = Date.now().toString();
        song.tags = typeof song.tags === 'string' ? 
            song.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : 
            song.tags;
        song.demoText = song.demoText || 'Demo song';
        
        if (audioData) {
            this.audioData[song.id] = { type: 'file', data: audioData };
        } else if (audioUrl) {
            this.audioData[song.id] = { 
                type: this.isYouTubeUrl(audioUrl) ? 'youtube' : 'url',
                data: audioUrl 
            };
        }
        
        this.songs.push(song);
        this.saveSongs();
        return song;
    }

    getAllSongs() {
        return this.songs;
    }

    getSong(id) {
        const song = this.songs.find(song => song.id === id);
        if (song) {
            song.audioData = this.audioData[id] || null;
        }
        return song;
    }

    updateSong(id, updatedSong, audioData = null, audioUrl = null) {
        const index = this.songs.findIndex(song => song.id === id);
        if (index !== -1) {
            const existingSong = this.songs[index];
            
            const tags = typeof updatedSong.tags === 'string' ? 
                updatedSong.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : 
                updatedSong.tags;

            if (audioData) {
                this.audioData[id] = { type: 'file', data: audioData };
            } else if (audioUrl) {
                this.audioData[id] = { 
                    type: this.isYouTubeUrl(audioUrl) ? 'youtube' : 'url',
                    data: audioUrl 
                };
            }

            this.songs[index] = {
                ...existingSong,
                ...updatedSong,
                id: existingSong.id,
                tags: tags,
                demoText: updatedSong.demoText || existingSong.demoText || 'Demo song'
            };
            
            this.saveSongs();
            return true;
        }
        return false;
    }

    deleteSong(id) {
        const index = this.songs.findIndex(song => song.id === id);
        if (index !== -1) {
            this.songs.splice(index, 1);
            delete this.audioData[id];
            this.saveSongs();
            return true;
        }
        return false;
    }

    searchSongs(query, sortBy = 'az', tags = []) {
        let filteredSongs = [...this.songs];

        if (query) {
            const searchQuery = query.toLowerCase();
            filteredSongs = filteredSongs.filter(song => 
                song.name.toLowerCase().includes(searchQuery) ||
                song.composer.toLowerCase().includes(searchQuery) ||
                song.lyrics.toLowerCase().includes(searchQuery) ||
                song.tags.some(tag => tag.toLowerCase().includes(searchQuery))
            );
        }

        if (tags.length > 0) {
            filteredSongs = filteredSongs.filter(song => 
                tags.some(searchTag => 
                    song.tags.some(songTag => 
                        songTag.toLowerCase().includes(searchTag.toLowerCase())
                    )
                )
            );
        }

        switch (sortBy) {
            case 'za':
                filteredSongs.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case 'az':
            default:
                filteredSongs.sort((a, b) => a.name.localeCompare(b.name));
        }

        return filteredSongs;
    }

    getAllTags() {
        const tagSet = new Set();
        this.songs.forEach(song => {
            song.tags.forEach(tag => tagSet.add(tag));
        });
        return Array.from(tagSet).sort();
    }

    getAudioData(songId) {
        return this.audioData[songId] || null;
    }

    updateAudioData(songId, audioData = null, audioUrl = null) {
        if (audioData) {
            this.audioData[songId] = { type: 'file', data: audioData };
        } else if (audioUrl) {
            this.audioData[songId] = { 
                type: this.isYouTubeUrl(audioUrl) ? 'youtube' : 'url',
                data: audioUrl 
            };
        }
        this.saveSongs();
    }

    isYouTubeUrl(url) {
        return url.match(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/);
    }

    getYouTubeVideoId(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    }
}

// Create a single instance of StorageManager
const storage = new StorageManager();
