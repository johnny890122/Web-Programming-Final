# Kuan好你ㄉ事 -- Web Programming Final Project

## 簡介

這是一個能夠簡單管理個人及團隊事務的網站。  
我們的靈感來自系女排每位迷迷糊糊的隊員以及各種繁雜的球隊事務，透過這個網站，球隊幹部可以輕鬆管理活動、公告、投票、比賽紀錄等重要資訊。  
使用者在個人頁面可以清楚看到自己及參與的球隊的所有活動日程，球隊頁面則可以提供活動日程、公告訊息、投票活動、比賽紀錄等功能。  
透過這次的專案，希望能幫助到所有事情太多煩不完的無力小老百姓。
#### GitHub repo :  https://github.com/johnny890122/Web-Programming-Final  


## 組員
 * 經濟四 - 錢紫翎
 * 經濟四 - 張祥賢 
 * 經濟五 - 陳又加

## 使用方式與功能

### 如何在 localhost 安裝與測試
1. Clone repo
2. 安裝 frontend & backend packages
  * (npm) cd frontend && npm install
  * (npm) cd backend && npm install
  * (yarn) cd frontend && yarn add
  * (yarn) cd backend && yarn add
3. .env file
  * 將 .env.defaults (./backend) 的內容複製為 .env
  * 填入自己的 MONGO_URL
4. 開啟第 1 個 terminal windows
  * (npm) cd frontend && npm start
  * (yarn) cd frontend && yarn start
5. 開啟第 2 個 terminal windows
  * (npm) cd backend && npm run server
  * (yarn) cd backend && yarn server 
6. 打開 http://localhost:3000 
  * 開始使用!


[如何在 localhost 安裝與測試之詳細步驟
請務必詳述，包含：基本的 yarn/npm 指令，後端如果使用其他語言所需要之安裝環境說明，資料庫串接與資料匯入方式，登入之帳密 (if needed)… 等。
助教/老師會完全按照此步驟執行安裝， 請不要期待助教/老師需要自己看懂你的系統架構/script 猜測安裝之指令。
如果助教/老師會按照此步驟安裝遇到任何的問題，導致無法 compile/執行，可歸因於同學之疏失者，一律按照 15 條之扣分標準給予 penalty。
至於測試，我們會按照你們提供的功能說明來測試，如有一些特別需要注意或是展示的地方，請說明清楚，或是提供測資
? 
建議準備一組測試用的 Secret key, 把它用 e-mail 寄到助教的信箱 (eewebprogramming...), 然後在 .env 以及 README 把需要填的 variables 填上去 (值請留空白), 屆時助教再根據 e-mail 提供的 key 填上去即可。當然，請事先在你們的 local host 測過，如果有什麼需要特別注意的地方，也請在 README.md 寫清楚。我們在測試時如有問題，會再詢問你們。]


### Sign up / Log in 頁面 :
#### Sign up
 * 初次使用需申請一個新的帳號，必要資訊為電子郵件、帳號、密碼。
 * 填寫頁面有設計防呆機制，確保填寫的資料格式正確。
 * 密碼使用 bcryptjs 加密後存入資料庫。

#### Log in
 * 完成申請後使用該組帳號密碼登入。

### User 個人頁面 :
#### User Setting
 * 首次登入時須設定用戶名稱，顯示在個人及球隊頁面。
 * 後續的登入中，點擊 setting 可以修改用戶名稱，也可以查看帳戶資訊。
#### Dashboard
 * 使用者的個人主頁面。
 ** 可在此創建個人 event，新增的個人事項會顯示在畫面左方的 information card 中。
 ** 若使用者所屬的球隊裡，有人新增團隊事項，該團隊事項會同步更新在個人頁面的 
   information card 中。
 ** 所有的 infomation card 點擊可以查看細節、刪除事項、更新內容。
 ** 
#### Event
 * 
#### Achievement
 * 
#### Notification 
 * 
#### all Teams
 * 顯示使用者參加的所有團隊，點及即可進入團隊頁面。
 * 使用者也可以在此創建團隊，並加入已註冊的用戶做為團隊成員。

### Team 團隊頁面 :
#### Member
 * 可新增、刪除團隊成員。
#### Event
 * 可新增、修改及刪除團隊活動，並顯示在團隊頁面及所有成員的個人頁面。
#### Post
 * 可新增、修改團隊公告，傳達球隊資訊。
#### Vote
 * 可新增投票活動，幫助球隊決策更有效率。 
 * 使用者點擊後可在對話框中選擇投票選項。
#### Score
 * 可新增比賽紀錄，並提供每局的團隊數據及該局每位球員之個人數據。  
 * 表單完美複製經濟女排慣用的紀錄單格式，讓使用者輕鬆運用毫無阻礙。

## 組員心得
### 經濟四 錢紫翎:
### 經濟四 張祥賢:
    這是我第一次寫這麼複雜的網站，雖然做到快跟 js 翻臉，不過跟組員們一起熬夜寫 
    code 真的學到很多，也很有成就感。我們做的是球隊的專案管理，因為大家都是美學
    傳教士，所以我們一開始花了很多時間在設計前端，像是 side bar 、按鈕、頁面的
    切換那些；後端的部分是用graphQL 去寫，但是可能因為這是比較後面才學的技術，
    加上我們想做功能實在有點太多，所以花了超多時間處理後端、資料庫那些，最後時間
    因素必須做出功能上的妥協。但總之我們蠻滿意最後的成品，也希望可以給需要的人
    真正使用這套 app！
### 經濟五 陳又加:
    我以為每個星期寫作業已經好辛苦了，結果做 final的時候直接都不用睡覺了 QQ。 
    Web 的作業和課程真的讓我學到好多，雖然 hack的分數都很爛但我有學到好多東西的。  
    謝謝教授、助教、組員、Stack Overflow 跟 Youtube 上面的外國人老師。

## 使用與參考之框架/模組/套件
### 前端
 * React
 * Apollo GraphQL
 * MUI
 * antd
 * full Calendar
### 後端
 * Node.js
 * GraphQL
### 資料庫
 * MongoDB

## 表單
組別 44 
組長中文姓名 錢紫翎
題目名稱 管好你的事
[Deployed service 網址]
Github Repo 網址 https://github.com/johnny890122/Web-Programming-Final
[Demo 影片網址]
[FB 社團貼文網址]
[(Optionoal) 其他想提醒老師與助教評分之事項]

## 影片
不得超過 6 分鐘，請在專題 deadline 前，上傳至雲端空間 (preferrably a video hosting service)，如 NTU G Suite, Youtube, Vimeo, FB 等
影片內容至少應包含：
簡單自介 (組別、組員姓名、題目名稱) 
三句話內介紹你們的題目在做什麼
Project Demo
程式碼架構/使用技術介紹
Optional 內容：動機/心得、投影片 or 其他輔助說明

## FB社團
[110-1] Web Programming Final
Group 44 管好你的事

* Demo 影片連結

這是一個能夠簡單管理個人及團隊事務的網站。  
我們的靈感來自系女排每位迷迷糊糊的隊員以及各種繁雜的球隊事務，透過這個網站，球隊幹部可以輕鬆管理活動、公告、投票、比賽紀錄等重要資訊。  
使用者在個人頁面可以清楚看到自己及參與的球隊的所有活動日程，球隊頁面則可以提供活動日程、公告訊息、投票活動、比賽紀錄等功能。  
透過這次的專案，希望能幫助到所有事情太多煩不完的無力小老百姓。  

* [Deployed 連結]
  
使用與參考之框架/模組/套件  
前端: React、Apollo GraphQL、MUI、antd、full Calendar 等  
後端: Node.js、GraphQL 等  
資料庫: MongoDB  

* [專題製作心得]

## 組員互評
請注意，每個人的貢獻分數請介於 0 ~ 100 之間，然後所有人的總和應為 100.0.
