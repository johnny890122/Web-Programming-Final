# Kuan好你ㄉ事！讓我管好你的事！ 

## 簡介
這是一個針對系上球隊開發，能夠簡單管理個人及球隊事務的網站。

在個人頁面中，使用者除了可以查看自己的日常行程外，還能清楚看到自己所在球隊的活動日程；在球隊頁面則提供了公告訊息、投票、比賽紀錄、新增活動等功能，讓球隊幹部可以輕鬆傳達各種重要資訊。

透過這次的專案，希望能幫助到所有事情太多、煩不完的無力小老百姓。🥳

#### GitHub repo :  https://github.com/johnny890122/Web-Programming-Final  
#### 影片 demo: https://youtu.be/RN1N1_OHGTE
此為 110-1 黃鐘揚教授開設的「網路服務程式設計」期末專案。

## 如何在 localhost 安裝與測試
 1. Clone this repo: `git clone https://github.com/johnny890122/Web-Programming-Final`
 2. Install frontend & backend packages (You can choose one of them to install.)
  * (npm) `cd frontend` && `npm install`
  * (npm) `cd backend` && `npm install`
  * (yarn) `cd frontend` && `yarn add`
  * (yarn) `cd backend` && `yarn add`
 3. Set up database
  * Make a copy of `.env.defaults (./backend)` and rename it as `.env`
  * Fill in your `MONGO_URL` (https://www.mongodb.com)
 4. Open a terminal windows
  * (npm) `cd frontend` && `npm start`
  * (yarn) `cd frontend` && `yarn start`
 5. Open another terminal windows
  * (npm) `cd backend` && `npm run server`
  * (yarn) `cd backend` && `yarn server`
 6. Open http://localhost:3000 in your browser and enjoy! 

## 功能介紹
### ⚾ Sign up / Log in 頁面 :
#### Sign up
 * 初次使用需申請一個新的帳號，必要資訊為電子郵件、帳號、密碼。
 * 頁面有設計防呆機制，例如：帳號密碼長度、該帳號是否已被註冊等等，確保填寫的個人資料有效。
 * 密碼使用 bcryptjs 加密後存入資料庫。

#### Log in
 * 完成申請後使用該組帳號密碼登入。

<img src="./pic/signup.gif" width="800">

### ⚾ User 個人頁面 :
#### User Setting
 * 首次登入時須設定用戶名稱，顯示在個人及球隊頁面。
 * 後續的登入中，點擊 setting 可以修改用戶名稱，也可以查看帳戶資訊。
#### Dashboard
 * 使用者的個人主頁面，支援的功能如下：
 1. 可在此創建個人 event，新增的個人事項會顯示在畫面左方的 information card 中。
 2. 若使用者所屬的球隊裡，有人新增團隊事項，該團隊事項會同步更新在個人頁面的 
   information card 中。
 3. 所有的 infomation card 點擊可以查看細節、刪除事項、更新內容。
 4. 畫面右上方會提示使用者近三天內到期的 event；右下方會通知使用者，團隊新增的
   「事件」、「貼文」、「投票」。
#### Event
 1. 以日曆的形式顯示「個人事項」和「團隊事項」。
 2. 日期的格子點擊後，可創建該天的個人 event 到 Dashboard 中
#### Achievement
 1. 顯示該使用者所獲得的成就，目前只有初次登入的獎勵，日後會新增其他勳章，例如
   在球隊的活躍度、比賽的 mvp 等等。

#### all Teams
 * 顯示使用者參加的所有團隊，點及即可進入團隊頁面。
 * 使用者也可以在此創建團隊，並加入已註冊的用戶做為團隊成員。

### ⚾ Team 團隊頁面 :
#### TeamHome 
 * 進入團隊頁面後，畫面左側新增團隊頁面專用的 Navbar (Home、Event、Post、Member、Score、Vote)。
 * 團隊首頁可顯示最近幾項活動、公告、投票、比賽紀錄。
 * 點擊各區塊的 VIEW ALL 按鈕觀看完整資訊。

 #### Event
 * 可依照條件篩選顯示的活動 (全部、未來、過去等)。
 * 點擊 CREATE 可新增活動並顯示在團隊頁面及所有成員的個人頁面。
 * 點擊各活動的 MORE 鍵可觀看詳細內容，包括 :  
    1. 活動名稱  
    2. 活動建立人  
    3. 活動日期  
    4. 活動地點  
    5. 活動細節  
 * 在詳細內容中也可以修改及刪除活動，並顯示在團隊頁面及所有成員的個人頁面。  

#### Member (隊員資訊)
 * 顯示隊員資訊，包含隊員名稱、帳號、電子郵件、身分(是否為管理員)。
 * 管理員可新增、刪除團隊成員。
   
#### Post
 * 點擊 CREATE可新增公告文章。
 * 點擊各文章的 MORE 鍵可觀看詳細內容，包括 :  
    1. 文章標題  
    2. 文章作者  
    3. 發表日期  
    4. 文章內容  
 * 在詳細內容中也可以修改文章內容，以及刪除文章。  
  
#### Score  
 * 點擊 CREATE可新增比賽紀錄。
 * 各 SCORE區塊顯示各場比賽標題、對手、局數及比賽日期。 
 * 點擊 DELETE按鈕可刪除該場比賽紀錄。
 * 點擊 SCORE區塊進入各局詳細記錄。

#### Score Detail
 * 點擊 CREATE可新增各局詳細紀錄。  
 * 紀錄單中可新增任意人數的球員個人詳細數據。  
 * 未填寫的欄位會自動填入 0或 ""。  
 * 點擊各局 Detail 可觀看詳細記錄單或編輯、刪除紀錄。  
  
#### Vote
 * 點擊 CREATE可新增投票活動，可設定截止時間及每人票數限制。  
 * 點擊投票活動可顯示詳細內容，包括 :  
    1. 投票題目  
    2. 截止時間
    3. 票數限制  
    4. 各選項及其得票數。  
 * 使用者勾選選項及可參與投票，票數會在下次檢視詳細內容時時更新。  
 * 使用者取消勾選選項及可取消投票。  
  
## 組員心得
### 經濟四 錢紫翎:
    一開始的理想很美好，開始寫之後就一切都不一樣了。  
    雖然每天都很生氣為什麼一直 error，但是做期末專案真的有讓我學到很多東西。  
    很謝謝老師的教導，也很謝謝組員一起互相 carry，沒有他們的話我早就停修了。  
    最後雖然網站還是弱弱的，但是之後應該會想要繼續維護，希望真的能拿它來使用！  
### 經濟四 張祥賢:
    這是我第一次寫這麼複雜的網站，雖然做到快跟 js 翻臉，不過跟組員們一起熬夜寫 
    code 真的學到很多，也很有成就感。我們做的是球隊的專案管理，因為大家都是美學
    傳教士，所以我們一開始花了很多時間在設計前端，像是 side bar 、按鈕、頁面的
    切換那些；後端的部分是用graphQL 去寫，但是可能因為這是比較後面才學的技術，
    加上我們想做功能實在有點太多，所以花了超多時間處理後端、資料庫那些，最後時間
    因素必須做出功能上的妥協。希望可以給需要的人真正使用這套 app！
### 經濟五 陳又加:
    我以為每個星期寫作業已經好辛苦了，結果做 final的時候直接都不用睡覺了 QQ。   
    Web 的作業和課程真的讓我學到好多，雖然 hack的分數都很爛但我有學到好多東西的。  
    尤其是做 final的時候深感功力大增，hack的時候不會的東西突然都會了...  
    希望球隊的人會喜歡，有機會的話也想再把它的功能弄得更完整。  
    謝謝教授、助教、組員、Stack Overflow 跟 Youtube 上面的外國人老師們。  


## 組員
 * 經濟四 - 錢紫翎
 * 經濟四 - 張祥賢 
 * 經濟五 - 陳又加

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
 
 ## About us: the best partners! 
 <img src="./pic/about.png" width="700">
