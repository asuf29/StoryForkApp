export const contents = [
  {
    storyId: 1,
    title: "Macera Başlasın!",
    steps: {
      start: {
        id: 'start',
        text: 'Bir sabah bilinmeyen bir ormanda uyandın. Önünde üç yol var.',
        image: require('../assets/images/story1/start.jpg'),
        choices: [
          { text: 'Sağdaki patikayı seç', nextId: 'path1' },
          { text: 'Ortadaki tünelden geç', nextId: 'path2' },
          { text: 'Soldaki ormana gir', nextId: 'path3' },
        ],
      },
      path1: {
        id: 'path1',
        text: 'Patika seni devasa bir ağaca götürdü.',
        image: require('../assets/images/story1/path1.jpg'),
        choices: [
          { text: 'Ağaca tırman', nextId: 'end1' },
          { text: 'Yerden devam et', nextId: 'end2' },
        ],
      },
      path2: {
        id: 'path2',
        text: 'Tünelin içinde ışıklar gördün.',
        image: require('../assets/images/story1/path2.jpg'),
        choices: [
          { text: 'Işıklara yaklaş', nextId: 'end3' },
          { text: 'Geri dön', nextId: 'start' },
        ],
      },
      path3: {
        id: 'path3',
        text: 'Ormanın içinde gizemli bir mağara buldun.',
        image: require('../assets/images/story1/path3.jpg'),
        choices: [
          { text: 'Mağaraya gir', nextId: 'end4' },
          { text: 'Mağaranın etrafını dolaş', nextId: 'end5' },
        ],
      },
      end1: { id: 'end1', text: 'Ağacın tepesinde gizli bir harita buldun! 🗺️', choices: [], image: require('../assets/images/story1/end1.jpg') },
      end2: { id: 'end2', text: 'Yerden ilerlerken zehirli sarmaşıklarla karşılaştın. 😬', choices: [], image: require('../assets/images/story1/end2.jpg') },
      end3: { id: 'end3', text: 'Işıklar aslında perilerdi. Seni ödüllendirdiler! ✨', choices: [], image: require('../assets/images/story1/end3.jpg') },
      end4: { id: 'end4', text: 'Mağara bir hazineye açıldı! 🎉', choices: [], image: require('../assets/images/story1/end4.jpg') },
      end5: { id: 'end5', text: 'Dolaşırken kayboldun. 😢', choices: [], image: require('../assets/images/story1/end5.jpg') },
    }
  },
  {
    storyId: 2,
    title: "Gizemli Adalar",
    steps: {
      start: {
        id: 'start',
        text: 'Bir adada uyandın. Etrafın denizle çevrili.',
        image: require('../assets/images/story2/start.jpg'),
        choices: [
          { text: 'Plaja doğru yürü', nextId: 'path1' },
          { text: 'Ormanın içine gir', nextId: 'path2' },
        ],
      },
      path1: {
        id: 'path1',
        text: 'Plajda bir sandık buldun.',
        image: require('../assets/images/story2/path1.jpg'),
        choices: [
          { text: 'Sandığı aç', nextId: 'end1' },
          { text: 'Yola devam et', nextId: 'end2' },
        ],
      },
      path2: {
        id: 'path2',
        text: 'Ormanda yerlilerle karşılaştın.',        
        image: require('../assets/images/story2/path2.jpg'),
        choices: [
          { text: 'Yerlilerle konuş', nextId: 'end3' },
          { text: 'Saklan', nextId: 'end4' },
        ],
      },
      end1: { id: 'end1', text: 'Sandıktan eski bir pusula çıktı! 🧭', choices: [], image: require('../assets/images/story2/end1.jpg') },
      end2: { id: 'end2', text: 'Yolda seni bir yengeç ısırdı! 🦀', choices: [], image: require('../assets/images/story2/end2.jpg') },
      end3: { id: 'end3', text: 'Yerliler seni dostça karşıladı ve bilgi verdi.', choices: [], image: require('../assets/images/story2/end3.jpg') },
      end4: { id: 'end4', text: 'Saklanırken bir tuzağa yakalandın! 😱', choices: [], image: require('../assets/images/story2/end4.jpg') },
    }
  },
  {
    storyId: 3,
    title: "Uzay Yolculuğu",
    steps: {
      start: {
        id: 'start',
        text: 'Uzay geminde uyandın. Alarm çalıyor!',
        image: require('../assets/images/story3/start.jpg'),
        choices: [
          { text: 'Kaptan köşküne git', nextId: 'path1' },
          { text: 'Motor odasına in', nextId: 'path2' },
        ],
      },
      path1: {
        id: 'path1',
        text: 'Kaptan koltuğunda boş bir mesaj var.',
        image: require('../assets/images/story3/path1.jpg'),
        choices: [
          { text: 'Mesajı çöz', nextId: 'end1' },
          { text: 'Mesajı yok say', nextId: 'end2' },
        ],
      },
      path2: {
        id: 'path2',
        text: 'Motorlar aşırı ısınıyor.',
        image: require('../assets/images/story3/path2.jpg'),
        choices: [
          { text: 'Sistemi kapat', nextId: 'end3' },
          { text: 'Soğutma sistemini çalıştır', nextId: 'end4' },
        ],
      },
      end1: { id: 'end1', text: 'Mesaj seni başka bir gezegene yönlendirdi. 🚀', choices: [], image: require('../assets/images/story3/end1.jpg') },
      end2: { id: 'end2', text: 'Mesajı görmezden geldiğin için saldırıya uğradın!', choices: [], image: require('../assets/images/story3/end2.jpg') },
      end3: { id: 'end3', text: 'Sistem kapandı ama yörüngeden çıktın!', choices: [], image: require('../assets/images/story3/end3.jpg') },
      end4: { id: 'end4', text: 'Soğutma işe yaradı, rota sabit kaldı. 👍', choices: [], image: require('../assets/images/story3/end4.jpg') },
    }
  },
  {
    storyId: 4,
    title: "Zaman Yolculuğu",
    steps: {
      start: {
        id: 'start',
        text: 'Bir zaman makinesinin içindesin. Hangi döneme gitmek istersin?',
        image: require('../assets/images/story4/start.jpg'),
        choices: [
          { text: 'Geçmişe git', nextId: 'path1' },
          { text: 'Geleceğe git', nextId: 'path2' },
        ],
      },
      path1: {
        id: 'path1',
        text: 'Orta Çağ’a geldin. Bir şövalye seni görüyor.',
        image: require('../assets/images/story4/path1.jpg'),
        choices: [
          { text: 'Şövalyeye yaklaş', nextId: 'end1' },
          { text: 'Kaç', nextId: 'end2' },
        ],
      },
      path2: {
        id: 'path2',
        text: 'Yıl 3025. Robotlar dünyayı yönetiyor.',
        image: require('../assets/images/story4/path2.jpg'),
        choices: [
          { text: 'Bir robota konuş', nextId: 'end3' },
          { text: 'Saklan', nextId: 'end4' },
        ],
      },
      end1: { id: 'end1', text: 'Şövalye seni krala götürdü. 👑', choices: [], image: require('../assets/images/story4/end1.jpg') },
      end2: { id: 'end2', text: 'Kaçarken bir tuzağa düştün. 😣', choices: [], image: require('../assets/images/story4/end2.jpg') },
      end3: { id: 'end3', text: 'Robotlar seni dostça karşıladı.', choices: [], image: require('../assets/images/story4/end3.jpg') },
      end4: { id: 'end4', text: 'Saklanırken zaman makinesi sinyalini kaybetti. 😔', choices: [], image: require('../assets/images/story4/end4.jpg') },
    }
  }
];
