# 📖 StoryFork – Interaktif Hikaye Okuma Deneyimi <br/>
Kullanıcının hikâyeleri okuyarak seçimler yaptığı, bu seçimlere göre farklı sonlara ulaştığı interaktif bir hikâye uygulaması.

# 🎯 Proje Amacı <br/>
Bu uygulamanın amacı, kullanıcıya seçimlere dayalı dallanan bir hikâye deneyimi sunmaktır. Her kullanıcı seçimi farklı bir hikâye yoluna yönlendirir ve uygulama kullanıcının ilerlemesini yerel olarak kaydeder.

# 🧠 Uygulama Özellikleri <br/>
- 📚 Hikâye Listesi: Uygulama açıldığında kullanıcıyı hikâye listesi karşılar.

- 🔀 Seçim Yapısı: Her bölümde kullanıcı iki farklı seçenekten birini seçer.

- ⏩ Bölüm Geçişi: Kullanıcının yaptığı seçime göre hikâye farklı bir bölüme dallanır.

- 💾 Yerel Kayıt: Tüm seçim geçmişi cihazda AsyncStorage ile saklanır.

- 📌 Devam Etme: Kullanıcı kaldığı yerden devam edebilir.

- 🏁 Alternatif Sonlar: Her hikâye farklı sonlara ulaşabilecek şekilde yapılandırılmıştır.

- ✅ Hikaye Tamamlandı Ekranı: Hikâye tamamlandığında kullanıcıya bilgi verilir.

- 📊 Seçim oranlarını gösteren sahte progress bar

- 🧭 Kullanıcının ilerleme yolunu grafiksel gösterim (timeline)

- 🌙 Dark Mode desteği

- 📡 Offline çalışma özelliği

# 🧱 Teknik Gereksinimler
- ⚛️ React Native – Expo CLI ile başlatılmış mobil uygulama

- 🧠 Redux Toolkit – Global state yönetimi için

- 🎨 TailwindCSS – Stil yönetimi

- 🌐 React Navigation – Ekranlar arası geçiş

- 💾 AsyncStorage – Seçim geçmişi ve ilerleme verilerinin saklanması

- 📱 Responsive Tasarım – Mobil uyumlu sezgisel kullanıcı arayüzü

# 📁 Kurulum ve Çalıştırma
## ✨ Adım 1: Projeyi Başlat <br/>
  `npx create-expo-app interactive-story-app --template` <br/>
  `cd interactive-story-app` <br/>
## ✨ Adım 2: Gerekli Kütüphaneleri Kur <br/>
- Navigation <br/>
`npm install @react-navigation/native @react-navigation/native-stack` <br/>
`npx expo install react-native-screens react-native-safe-area-context` <br/>

- Redux <br/>
`npm install @reduxjs/toolkit react-redux` <br/>

- AsyncStorage <br/>
`npx expo install @react-native-async-storage/async-storage` <br/>

- Animasyon <br/>
`npx expo install react-native-reanimated` <br/>


