# CineMyRoom
### 🧞 映画好きのための映画検索+記録帖、そして様々なスレについてチャットで交流できる映画アプリです！

<img width="693" alt="スクリーンショット 2023-07-09 1 12 31" src="https://github.com/mayucoisobe/cine-chat/assets/121940353/408f207f-3b49-4d49-b6aa-aa978a306184">

## 背景・目的

映画を見るのが趣味の 1 つで、以前より個人的に何かいいツールはないかなと探していました。 主に以下の目的を達成したく、アプリ制作に至りました。

- 鑑賞した記録を個人メモとして残したい。以前はノートや手帳に書いていたこともあったが残せる形にしたい。
- 鑑賞直後に疑問に思った場面について無性に気になってしまい、口コミや解説を読んで夢中で探していることがあるが、一方的な情報発信ではなく友人と感想を語りあるような形で、チャットのように交流しながら語れるスペースが欲しい。
- 鑑賞傾向などを可視化して見れたら面白そう！

以上のことから、これらの複合的な機能を持った映画アプリを制作することにしました。

## 概要

主な機能

- Login（Google アカウントでの認証）
- ChatRoom(チャットルーム)
- MyRoom(鑑賞した作品の記録一覧)
- Search(作品検索+マイルームへの登録/ 検索のみログインなしで利用可)
- Analyze U(映画鑑賞傾向の分析ページ)

## 🚀 画面構成

## 技術スタック
React/TypeScript/Next.js で構築しました。ホスティングは Vercel を利用し、PWA 対応しました。

映画の検索には、TMDB の API を利用し、映画とドラマから各々検索できるようになっています。 

データベース・認証機能は Firebase を使っています。

---
- React
- TypeScript
- Next.js 13.4.2
- Vercel
- Firebase (CloudFirestore / FirebaseAuthentication)
- Chakra UI
- GSAP
- [TMDB API](https://developer.themoviedb.org/docs) 


## 苦労したポイント
> TypeScript

- 基本の型を確認した程度で挑んだため、エラーだらけになり時間がかかりました。
  今後より理解を深めつつ、次の制作時に活かしていきます。

> コンポーネント管理

- ページ構成に沿ってコンポーネントを分割しようとしたのですが、ざっくりとしか設計していなかったため、乱雑になってしまいました。

#### Links

- [**CineMyRoom**](https://cinemyroom.vercel.app/)
- [**GitHub**](https://github.com/mayucoisobe/cine-chat)



