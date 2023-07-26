# CLOUD NINE

## QUICK REVIEW

Cloud Nine is a weather forecast application created for the purpose of viewing live weather and weather forecasts from major cities around the globe. It can also minor as a world clock as the current time from each city is also displayed. A short demo video of the web application has been attached below.
The Home page comprises of 3 components:

### The Navigation bar:
The Navigation bar shows the clever name of the web app, Cloud Nine and a sort functionality on the opposite end. We’d talk more about that later.

### The Filter bar:
This component comprises of a search functionality and a ‘filter by’ functionality on the other end in which both of them filter the cities shown below according to the users input on both components hence the name, Filter Bar.

### The Cities Grid:
This is the main component of the app and depending on your screen size it displays as either 1 column ( smaller screens ) or 2 columns (larger screens) of card like city components. Where you can see a variety of information about each of the 40 major cities displayed.
The information includes:

1. A nice thumbnail picture of the city
2. The name of the city
3. The country in which the city is in
4. The current temperature in the city
5. The weather description of the city (e.g light rain, clear sky, etc.)
6. A nice icon that describes the weather in the city
7. The current time in the city  

The Cities in the Cities grid can be sorted, filtered and searched for by their respective components locater above the grid on the home page.

Now each city component in the grid is clickable, and the user knows this because there is a cursor:pointer hover effect on each of them. When a city component is clicked, it dynamically navigates the user to a new page, what I call the ‘City Weather Details’ page that gives more detailed information about the city which was just clicked. This page in itself comprises of 4 major components:

### The Backdrop :
The first thing a user gets to see is an eye catching visual of the city in question with the name of the city largely pasted on a large image of the city that spans the full width of the screen kind of in a background image fashion. It is truly beautiful and you should check it out.

### The Today Component :
This component focuses on today, It is a box like component that gives more current wether information about the city and forecasts of the weather up to 12 hours from the time in that city (with 3 hour intervals). There are nice visuals and graphics to help paint a vivid picture of what the weather will be throughout that day.

### The Tomorrow Component : 
This is a replica of the today component, however as you might have guessed, all its information talks about how the weather would be like the next day.

### The Extras Component :
This lovely component provides even more weather information for the more curious users. It gives the user information about things like humidity, sunrise, sunset, air pressure and wind speed.

## Video Demo of Project
Below is a link to a demo depicting all the amazing features of this web application along with its beautiful UI

### [CLOUD NINE DEMO](https://drive.google.com/file/d/1pFyvAiAt4IlHEiphWV0M39ZUHzxWwa3T/view?usp=sharing)

Enjoy the video


## DOWNLOAD AND RUN LOCALLY

If you want to have this piece of art on your PC there are a few simple steps to take. Let’s get into it.
Firstly you need to know that this is a React app created with  ‘Npm create-react-app’ so if you want to run this project on your PC, you would need to have Node js Installed

### Cloning the Repo

If (you are familiar with GitHub){
 this should be an easy task for you
 }
Else{
Follow the steps below
}

Cloning, as the name implies, basically means copying a folder to your local computer, to do that you need to:
1. Navigate to the ‘weatherapp’ repository. If you’re reading this go back one webpage on this current tab and you would be at your destination.
2. Just above the list of files and below the name of the repo ‘weatherapp’, locate the ‘Code’ button. (It is usually green).
3. Click on the ‘Code’ button, you should see a link in the modal that drops down.
4. Copy that link and open any text editor of your choice (VS Code Recommended).
5. Create a new folder from the ‘file’ button at the top of your screen.
6. Open the terminal in that folder by running Command + J on MacBooks or Ctrl + J on windows.
7. In the terminal type out ‘git clone’ followed by a space and then paste in the link you copied earlier and press ‘enter’
8. Congratulations, you have successfully cloned the application but there’s still a little for you to do before you can see the web app on your pc

### Running the application
Now that you have a copy of the application let’s talk about how to actually run it:
1. Open the cloned folder in a text editor of your choice like (once again VS Code Recommended).
2. Open the terminal of the cloned folder. (Mac: Command + J, Windows: Ctrl + J)
3. Run ‘npm install’ to install all the project dependencies (See a list of dependencies in the package.json file)
4. After all dependencies have been installed, run ‘rpm run start’ on the terminal and get transported to Cloud Nine (literally and figuratively speaking).

Now you have seen the 8th wonder of the world and you can test all the features of the app yourself. 


## SOURCES

If you have gone through the app or watched the video earlier, you might be surprised to hear that it is a 0% hard coded app which means all the information you see like the weather, cities, countries, time and even the pictures are extracted from different data sources on the web.

Let’s talk about it and as well dive into a bit of the code structure and architecture.

Firstly, the list of cities you see is gotten from the [GeoDB cities API](https://rapidapi.com/wirefreethought/api/geodb-cities) which can be found on RapidAPI.

Unfortunately this API had freemium users limited to only 10 results per call and 1 call per second. This was a big issue and it took a brilliant piece of engineering and problem solving to deliver 40 cities to you, my dear user. This piece of engineering can be found in the getCities function in the ‘Cities.jsx’ file in the components folder in the src folder of the project. However this has its limitations as it delays any loading of the home page by about 6.8 seconds which you may have noticed. But hey, look on the bright side it gives you a chance to see my amazing preloaded animation. 

Now that list of cities is then passed into another function that calls the [OpenWeatherMap current weather data API](https://openweathermap.org/current) which gets us current weather info about each city.


At the same time the initial list of cities is also passed into the [Unsplash API](https://unsplash.com/documentation#search-photos) to get images for each city


Another function gathers and parses all this data into a comprehensive list of objects that is then displayed in a beautiful manner on the page.

When you click on any city thereby navigating to the ‘City Weather Details’ page, all the information about that city is passed into the page.
Another API, the [Openweathermap 5 day/ 3 hour API](https://openweathermap.org/forecast5) is called to get weather forecasts this time in 3 hour intervals.


There you have it, a quick and short summary of the working principles behind this app


## KEY FEATURES

1. Multiple Asynchronous JavaScript and API calls
2. React Router: Dynamic Routing
3. React Router: passing info between pages
4. Tailwind CSS: fully responsive
5. Search functionality
6. Sort functionality
7. Filter functionality
8. Pre-loader Animation with Lottie Animations
9. Beautiful UI/UX

Everything, from Conceptualisation to Design to Execution was done by me,
### Bajomo David
### Reach me at:
### [Email](bajomodavid18@gmail.com)

### [Twitter](https://twitter.com/BDaiveed)
### [LinkedIn](https://www.linkedin.com/in/davidbajomo/)
### Check out my [Portfolio](https://portfoliodaiveed.netlify.app/) for more projects like this
