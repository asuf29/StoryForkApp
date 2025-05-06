export const contents = [
  {
    storyId: 1,
    steps: {
      start: {
        id: 'start',
        text: 'Bir sabah ormanda uyandın. İki yol var önünde.',
        choices: [
          { text: 'Sağdaki patikayı seç', nextId: 'path1' },
          { text: 'Soldaki yolu takip et', nextId: 'path2' },
        ],
      },
      path1: {
        id: 'path1',
        text: 'Sağdaki patikada garip bir ses duydun.',
        choices: [
          { text: 'Sesi takip et', nextId: 'end1' },
          { text: 'Geri dön', nextId: 'start' },
        ],
      },
      path2: {
        id: 'path2',
        text: 'Soldaki yol seni bir nehre götürdü.',
        choices: [
          { text: 'Nehri geç', nextId: 'end2' },
          { text: 'Yolun kenarında otur', nextId: 'end3' },
        ],
      },
      end1: { id: 'end1', text: 'Bir ayı buldun! Hikâye burada biter.', choices: [] },
      end2: { id: 'end2', text: 'Nehri geçtin ve hazineyi buldun! 🎉', choices: [] },
      end3: { id: 'end3', text: 'Manzarayı izlerken uyuyakaldın. 💤', choices: [] },
    }
  },
  {
    storyId: 2,
    steps: {
      start: {
        id: 'start',
        text: 'Bir sabah ormanda uyandın. İki yol var önünde Asude Fışkın.',
        choices: [
          { text: 'Sağdaki patikayı seç', nextId: 'path1' },
          { text: 'Soldaki yolu takip et', nextId: 'path2' },
        ],
      },
      path1: {
        id: 'path1',
        text: 'Sağdaki patikada garip bir ses duydun.',
        choices: [
          { text: 'Sesi takip et', nextId: 'end1' },
          { text: 'Geri dön', nextId: 'start' },
        ],
      },
      path2: {
        id: 'path2',
        text: 'Soldaki yol seni bir nehre götürdü.',
        choices: [
          { text: 'Nehri geç', nextId: 'end2' },
          { text: 'Yolun kenarında otur', nextId: 'end3' },
        ],
      },
      end1: { id: 'end1', text: 'Bir ayı buldun! Hikâye burada biter.', choices: [] },
      end2: { id: 'end2', text: 'Nehri geçtin ve hazineyi buldun! 🎉', choices: [] },
      end3: { id: 'end3', text: 'Manzarayı izlerken uyuyakaldın. 💤', choices: [] },
    }
  },
  {
    storyId: 3,
    steps: {
      start: {
        id: 'start',
        text: 'Bir sabah ormanda uyandın. İki yol var önünde.',
        choices: [
          { text: 'Sağdaki patikayı seç', nextId: 'path1' },
          { text: 'Soldaki yolu takip et', nextId: 'path2' },
        ],
      },
      path1: {
        id: 'path1',
        text: 'Sağdaki patikada garip bir ses duydun.',
        choices: [
          { text: 'Sesi takip et', nextId: 'end1' },
          { text: 'Geri dön', nextId: 'start' },
        ],
      },
      path2: {
        id: 'path2',
        text: 'Soldaki yol seni bir nehre götürdü.',
        choices: [
          { text: 'Nehri geç', nextId: 'end2' },
          { text: 'Yolun kenarında otur', nextId: 'end3' },
        ],
      },
      end1: { id: 'end1', text: 'Bir ayı buldun! Hikâye burada biter.', choices: [] },
      end2: { id: 'end2', text: 'Nehri geçtin ve hazineyi buldun! 🎉', choices: [] },
      end3: { id: 'end3', text: 'Manzarayı izlerken uyuyakaldın. 💤', choices: [] },
    }
  },
  {
    storyId: 4,
    steps: {
      start: {
        id: 'start',
        text: 'Bir sabah ormanda uyandın. İki yol var önünde.',
        choices: [
          { text: 'Sağdaki patikayı seç', nextId: 'path1' },
          { text: 'Soldaki yolu takip et', nextId: 'path2' },
        ],
      },
      path1: {
        id: 'path1',
        text: 'Sağdaki patikada garip bir ses duydun.',
        choices: [
          { text: 'Sesi takip et', nextId: 'end1' },
          { text: 'Geri dön', nextId: 'start' },
        ],
      },
      path2: {
        id: 'path2',
        text: 'Soldaki yol seni bir nehre götürdü.',
        choices: [
          { text: 'Nehri geç', nextId: 'end2' },
          { text: 'Yolun kenarında otur', nextId: 'end3' },
        ],
      },
      end1: { id: 'end1', text: 'Bir ayı buldun! Hikâye burada biter.', choices: [] },
      end2: { id: 'end2', text: 'Nehri geçtin ve hazineyi buldun! 🎉', choices: [] },
      end3: { id: 'end3', text: 'Manzarayı izlerken uyuyakaldın. 💤', choices: [] },
    }
  }
];