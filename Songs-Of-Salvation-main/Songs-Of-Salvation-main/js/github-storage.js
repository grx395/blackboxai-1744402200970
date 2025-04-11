class GitHubStorageManager {
    constructor() {
        this.owner = 'Maxyey';
        this.repo = 'LYRICSSOS-SOURCES';
        this.branch = 'main';
        this.baseUrl = 'https://api.github.com';
        this.dataFile = 'songs-data.json';
    }

    async initialize() {
        try {
            const data = await this.fetchSongsData();
            if (!data) {
                // Initialize with sample data if no songs exist
                const sampleSongs = [
                    {
                        id: '1',
                        name: 'Amazing Grace',
                        composer: 'John Newton',
                        lyrics: 'Amazing grace, how sweet the sound\nThat saved a wretch like me.\nI once was lost, but now am found,\nWas blind, but now I see.',
                        tags: ['hymn', 'classic', 'worship'],
                        demoText: 'Demo song'
                    },
                    {
                        id: '2',
                        name: 'How Great Thou Art',
                        composer: 'Carl Boberg',
                        lyrics: 'O Lord my God, when I in awesome wonder\nConsider all the worlds Thy hands have made,\nI see the stars, I hear the rolling thunder,\nThy power throughout the universe displayed.',
                        tags: ['hymn', 'worship', 'traditional'],
                        demoText: 'Demo song'
                    },
                    {
                        id: '3',
                        name: 'It Is Well',
                        composer: 'Horatio Spafford',
                        lyrics: 'When peace like a river attendeth my way,\nWhen sorrows like sea billows roll,\nWhatever my lot, Thou hast taught me to say,\nIt is well, it is well with my soul.',
                        tags: ['hymn', 'peace', 'classic'],
                        demoText: 'Demo song'
                    }
                ];
                await this.saveSongsData({ songs: sampleSongs, audioData: {} });
                return { songs: sampleSongs, audioData: {} };
            }
            return data;
        } catch (error) {
            console.error('Error initializing GitHub storage:', error);
            return { songs: [], audioData: {} };
        }
    }

    async fetchSongsData() {
        try {
            const response = await fetch(`${this.baseUrl}/repos/${this.owner}/${this.repo}/contents/${this.dataFile}`);
            if (!response.ok) {
                if (response.status === 404) {
                    return null; // File doesn't exist yet
                }
                throw new Error(`GitHub API error: ${response.statusText}`);
            }
            const data = await response.json();
            const content = atob(data.content);
            return JSON.parse(content);
        } catch (error) {
            if (error.message.includes('404')) {
                return null; // File doesn't exist yet
            }
            throw error;
        }
    }

    async saveSongsData(data) {
        try {
            const content = btoa(JSON.stringify(data, null, 2));
            const currentFile = await this.fetchSongsData();
            
            const requestBody = {
                message: 'Update songs data',
                content: content,
                branch: this.branch
            };

            if (currentFile) {
                requestBody.sha = currentFile.sha;
            }

            const response = await fetch(`${this.baseUrl}/repos/${this.owner}/${this.repo}/contents/${this.dataFile}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${this.getGitHubToken()}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error(`GitHub API error: ${response.statusText}`);
            }

            return true;
        } catch (error) {
            console.error('Error saving data to GitHub:', error);
            return false;
        }
    }

    getGitHubToken() {
        // This should be replaced with a secure way to get the GitHub token
        // For development, you can store it in localStorage or as an environment variable
        return localStorage.getItem('github_token');
    }
}

// Create a single instance of GitHubStorageManager
const githubStorage = new GitHubStorageManager();
