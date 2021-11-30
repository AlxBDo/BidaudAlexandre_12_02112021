[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/uses-css.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/uses-html.svg)](https://forthebadge.com)


# SportSee : The physical activity tracking app

The SportSee app measures your performance and fitness indicators so you can track your physical activity

![ScreenShot](https://alxbdo.github.io/BidaudAlexandre_12_02112021/src/assets/maquette.png)


## 1. Author

Alexandre Bidaud


## 2. Technologies

- JS
- CSS
- React
- D3.js


## 3. Project

### 3.1 Prerequisites

- [NodeJS (**version 12.18**)](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/)
- Optional [User data API](https://github.com/OpenClassrooms-Student-Center/P9-front-end-dashboard) 

If you are working with several versions of NodeJS, we recommend you install [nvm](https://github.com/nvm-sh/nvm). This tool will allow you to easily manage your NodeJS versions.


### 3.2 Launching the project

- Clone it on your computer :

    * github -> green code button -> clone -> copy link

![ScreenShot](https://alxbdo.github.io/BidaudAlexandre_12_02112021/src/assets/clone_repo.jpg)

    * In your terminal 
``` git clone https://github.com/AlxBDo/BidaudAlexandre_12_02112021.git ```

- `npm` installation : ``` npm install ```

- `yarn` installation : ``` npm install yarn```

- Optional `User data API` installation : [API Readme.md](https://github.com/OpenClassrooms-Student-Center/P9-front-end-dashboard/blob/master/README.md) .
If you don't use the API the app will only work with mocked data

- Lunch the project : ``` yarn start ```


## 4. Endpoints

### 4.1 Used endpoints

To retrieve user information, the project uses the endpoints below: 

- `http://localhost:3000/user/${userId}` - retrieves information from a user. This first endpoint includes the user id, user information (first name, last name and age), the current day's score (todayScore) and key data (calorie, macronutrient, etc.).
- `http://localhost:3000/user/${userId}/activity` - retrieves a user's activity day by day with kilograms and calories.
- `http://localhost:3000/user/${userId}/average-sessions` - retrieves the average sessions of a user per day. The week starts on Monday.
- `http://localhost:3000/user/${userId}/performance` - retrieves a user's performance (energy, endurance, etc.).


### 4.2 Examples of queries

- `http://localhost:3000/user/12/performance` - Retrieves the performance of the user with id 12
- `http://localhost:3000/user/18` - Retrieves user 18's main information.


## 5. Documentation

The documentation can be viewed by following the link below : [documentation](https://alxbdo.github.io/BidaudAlexandre_12_02112021/docs/index.html)
