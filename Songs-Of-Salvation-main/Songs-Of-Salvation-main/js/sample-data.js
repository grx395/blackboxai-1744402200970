// Initialize with sample data if none exists
if (!localStorage.getItem('songs')) {
    const sampleSongs = [
        {
            id: '1',
            name: 'Amazing Grace',
            composer: 'John Newton',
            lyrics: 'Amazing grace, how sweet the sound\nThat saved a wretch like me.\nI once was lost, but now am found,\nWas blind, but now I see.',
            tags: ['hymn', 'classic', 'worship'],
            date: new Date('2024-01-01').toISOString()
        },
        {
            id: '2',
            name: 'How Great Thou Art',
            composer: 'Carl Boberg',
            lyrics: 'O Lord my God, when I in awesome wonder\nConsider all the worlds Thy hands have made,\nI see the stars, I hear the rolling thunder,\nThy power throughout the universe displayed.',
            tags: ['hymn', 'worship', 'traditional'],
            date: new Date('2024-01-02').toISOString()
        },
        {
            id: '3',
            name: 'It Is Well',
            composer: 'Horatio Spafford',
            lyrics: 'When peace like a river attendeth my way,\nWhen sorrows like sea billows roll,\nWhatever my lot, Thou hast taught me to say,\nIt is well, it is well with my soul.',
            tags: ['hymn', 'peace', 'classic'],
            date: new Date('2024-01-03').toISOString()
        }
    ];

    localStorage.setItem('songs', JSON.stringify(sampleSongs));
}
