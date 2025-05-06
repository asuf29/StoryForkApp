export const contents = [
  {
    storyId: 1,
    title: "Macera Başlasın!",
    steps: {
      start: {
        id: 'start',
        text: 'Bir sabah bilinmeyen bir ormanda uyandın. Önünde üç yol var.',
        choices: [
          { text: 'Sağdaki patikayı seç', nextId: 'path1' },
          { text: 'Ortadaki tünelden geç', nextId: 'path2' },
          { text: 'Soldaki ormana gir', nextId: 'path3' },
        ],
      },
      path1: {
        id: 'path1',
        text: 'Patika seni devasa bir ağaca götürdü.',
        choices: [
          { text: 'Ağaca tırman', nextId: 'end1' },
          { text: 'Yerden devam et', nextId: 'end2' },
        ],
      },
      path2: {
        id: 'path2',
        text: 'Tünelin içinde ışıklar gördün.',
        choices: [
          { text: 'Işıklara yaklaş', nextId: 'end3' },
          { text: 'Geri dön', nextId: 'start' },
        ],
      },
      path3: {
        id: 'path3',
        text: 'Ormanın içinde gizemli bir mağara buldun.',
        choices: [
          { text: 'Mağaraya gir', nextId: 'end4' },
          { text: 'Mağaranın etrafını dolaş', nextId: 'end5' },
        ],
      },
      end1: { id: 'end1', text: 'Ağacın tepesinde gizli bir harita buldun! 🗺️', choices: [] },
      end2: { id: 'end2', text: 'Yerden ilerlerken zehirli sarmaşıklarla karşılaştın. 😬', choices: [] },
      end3: { id: 'end3', text: 'Işıklar aslında perilerdi. Seni ödüllendirdiler! ✨', choices: [] },
      end4: { id: 'end4', text: 'Mağara bir hazineye açıldı! 🎉', choices: [] },
      end5: { id: 'end5', text: 'Dolaşırken kayboldun. 😢', choices: [] },
    }
  },
  {
    storyId: 2,
    title: "Gizemli Adalar",
    steps: {
      start: {
        id: 'start',
        text: 'Bir adada uyandın. Etrafın denizle çevrili.',
        choices: [
          { text: 'Plaja doğru yürü', nextId: 'path1' },
          { text: 'Ormanın içine gir', nextId: 'path2' },
        ],
      },
      path1: {
        id: 'path1',
        text: 'Plajda bir sandık buldun.',
        choices: [
          { text: 'Sandığı aç', nextId: 'end1' },
          { text: 'Yola devam et', nextId: 'end2' },
        ],
      },
      path2: {
        id: 'path2',
        text: 'Ormanda yerlilerle karşılaştın.',
        choices: [
          { text: 'Yerlilerle konuş', nextId: 'end3' },
          { text: 'Saklan', nextId: 'end4' },
        ],
      },
      end1: { id: 'end1', text: 'Sandıktan eski bir pusula çıktı! 🧭', choices: [] },
      end2: { id: 'end2', text: 'Yolda seni bir yengeç ısırdı! 🦀', choices: [] },
      end3: { id: 'end3', text: 'Yerliler seni dostça karşıladı ve bilgi verdi.', choices: [] },
      end4: { id: 'end4', text: 'Saklanırken bir tuzağa yakalandın! 😱', choices: [] },
    }
  },
  {
    storyId: 3,
    title: "Uzay Yolculuğu",
    steps: {
      start: {
        id: 'start',
        text: 'Uzay geminde uyandın. Alarm çalıyor!',
        choices: [
          { text: 'Kaptan köşküne git', nextId: 'path1' },
          { text: 'Motor odasına in', nextId: 'path2' },
        ],
      },
      path1: {
        id: 'path1',
        text: 'Kaptan koltuğunda boş bir mesaj var.',
        choices: [
          { text: 'Mesajı çöz', nextId: 'end1' },
          { text: 'Mesajı yok say', nextId: 'end2' },
        ],
      },
      path2: {
        id: 'path2',
        text: 'Motorlar aşırı ısınıyor.',
        choices: [
          { text: 'Sistemi kapat', nextId: 'end3' },
          { text: 'Soğutma sistemini çalıştır', nextId: 'end4' },
        ],
      },
      end1: { id: 'end1', text: 'Mesaj seni başka bir gezegene yönlendirdi. 🚀', choices: [] },
      end2: { id: 'end2', text: 'Mesajı görmezden geldiğin için saldırıya uğradın!', choices: [] },
      end3: { id: 'end3', text: 'Sistem kapandı ama yörüngeden çıktın!', choices: [] },
      end4: { id: 'end4', text: 'Soğutma işe yaradı, rota sabit kaldı. 👍', choices: [] },
    }
  },
  {
    storyId: 4,
    title: "Zaman Yolculuğu",
    steps: {
      start: {
        id: 'start',
        text: 'Bir zaman makinesinin içindesin. Hangi döneme gitmek istersin?',
        choices: [
          { text: 'Geçmişe git', nextId: 'path1' },
          { text: 'Geleceğe git', nextId: 'path2' },
        ],
      },
      path1: {
        id: 'path1',
        text: 'Orta Çağ’a geldin. Bir şövalye seni görüyor.',
        choices: [
          { text: 'Şövalyeye yaklaş', nextId: 'end1' },
          { text: 'Kaç', nextId: 'end2' },
        ],
      },
      path2: {
        id: 'path2',
        text: 'Yıl 3025. Robotlar dünyayı yönetiyor.',
        choices: [
          { text: 'Bir robota konuş', nextId: 'end3' },
          { text: 'Saklan', nextId: 'end4' },
        ],
      },
      end1: { id: 'end1', text: 'Şövalye seni krala götürdü. 👑', choices: [] },
      end2: { id: 'end2', text: 'Kaçarken bir tuzağa düştün. 😣', choices: [] },
      end3: { id: 'end3', text: 'Robotlar seni dostça karşıladı.', choices: [] },
      end4: { id: 'end4', text: 'Saklanırken zaman makinesi sinyalini kaybetti. 😔', choices: [] },
    }
  }
];
