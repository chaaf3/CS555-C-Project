# CS555 - Team Password Solar Panel Project

Hello and welcome to our project! 

The goal of this project is to create a communication platform for solar panel installations for both the customer and all parties involved in the installation process. The platform will provide an easy to use interface for customers to schedule installations and receive updates on the status of their project, as well as for installers to communicate with each other. For example, the platform will allow for communication between sales representatives, project managers, and installation teams, allowing them to collaborate to ensure timely and successful installations. The overall goal of the project is to reduce any resistance toward the customer experience or the internal work flow.

### Sprint 2 Review

*Comparing Planned Features to Actual Features*:

This sprint we were much more proactive in our development, taking into consideration the things we have learned from Sprint 1 to complete and continuously integrate our user stories.   We took our responsibilities head on immediately which allowed us to finish our tasks with plenty of time to spare. This further allowed us to delve deeply into refactoring our codebase to improve its modularity and cleanliness. Our features were entirely finished and we had enough time to put in more hours into modifying and improving our previous features.

*New Features as User Stories*:

We've accomplished a good portion more of our total work load, and we still do not see the need to add new features to our user stories. We have naturally filled in the gaps from one user story to another, and believe we can continue to do so. However, if we run into a portion of our project where we see fit to add a new User Story to tackle it, we won't hesitate to add it.

*Reflection on Sprint*:

We have learned a lot from the lectures that have improved our workflow, and we've taken into consideration a lot of the pitfalls we may have had last sprint to reinforce the idea of continuously pushing to the repository, having others review our code to ensure we are not pushing any mistakes or uncaught garbage to the main pipeline, and overall ensure we are working consistently. This has led to an improved codebase where different features work more seamlessly than we had at the end of Sprint 1. We feel the product is on good pace to completion.



### Sprint 2 Retrospective

*Reflection on Progress*:

This sprint, we were able to expect the unexpected and had a much better group workflow throughout the sprint. We exercised pair programming frequently, and asked each other for help on topics where we felt less familiar. We still mainly use iMessage group chats out of convenience, but have been able to use Slack for announcements and reminders. The group has gotten into a better flow with the Sprint mindset, have been able to coordinate times to meet and work together, and have been providing really useful feedback to others when pushing code.

*Planning for next Sprint*:

We've done much better organizing and managing the codebase. We want to continue the process of developing code while communicating with the team, and then submitting our code for review by two team members before adding it to the main pipeline. This way we know that we have our team members looking at our code even when we're programming alone, which adds a little bit of peer pressure that helps us stick to coding standards and keep our code readable. We have a pretty solid flow going into the next sprint now, so we can focus on helping each other stay in flow and make sure we are continually working on our features throughout the entire project. Because we did a lot of refactoring this sprint in between adding our features, next sprint we can follow the "frequently switching hats" process better by repeatedly adding a feature, refactoring, then adding a new feature without spilling one's role into the other.

*Improve the process*:

This sprint we've learned our weaknesses and strengths and got much better at working in pairs. Going forward, we want to make sure the pair programming switching will be happening across computers so that everyone has a portion they can push themselves to count toward the commits. We will continue to learn in class about Agile principles and use them to the best of our ability moving forwards.



### Sprint 1 Review

*Comparing Planned Features to Actual Features*:

Given the amount of unanticipated factors outside of our control (expanded on below), we completed a very high percentage of the planned features, with only minor exceptions of filling in already selected times and dates due to already filled in slots. Also, there were some complications regarding the bank updates since we do not have all of the required information to formally send a request and receive a response from a bank. The only reason this task is still in progress is due to the oversight of requiring projects to have been already been initiated. Since our project database can be further refined, we can move this quality of life feature to a later sprint.

*New Features as User Stories*:

In terms of new features, we still have a large portion of the user stories to implement in Sprint 2 onwards, so we do not have any specific features that we can add that are not encompassed by already existing user stories.

*Reflection on Sprint*:

We were able to get a lot of work done this sprint, and using the tools we have acquired from the CS555 lectures, we will be able to create a much smoother workflow with continuous integrations. We will elaborate further in the retrospective, but as we adjust to the Sprint mindset this is something that we will always be able to improve upon moving forwards.

### Sprint 1 Retrospective

*Reflection on Progress*:

This Sprint was full of surprises as we really needed to expect the unexpected. Between midterms, coordinating between team members, a state of emergency water crisis, a little bit of rust surrounding GitHub, and beginning to get into the rhythm of the Sprint process, we had a lot of factors we hadn't considered before the project had begun. While everyone has been very cooperative in participating on our Discord group chat, sharing their screens and sharing resources with other team members, we ran into some trouble making sure everyone could pull the repository locally and then upload to branches based on their user stories. We also gave ourselves some foundational parts of the project that required more framework considerations than we had initially acknowledged. That being said, our team worked together well to complete our tasks, and are excited to be implementing Continuous Integration much more smoothly as we have learned it in class for the future Sprints. Our strongest choice this sprint was creating multiple branches so that we could isolate our changes to ensure that our features could be developed in parallel.

*Planning for next Sprint*:

For our next sprint, we plan to focus a lot more on managing and organizing the projects and their details. We will be solidifying the project details, descriptions, and aim to provide a sense of scope. We will also aim to provide the user with the ability to update and estimate the duration of the current tasks, as well as further the compliance agreements like getting approval from the parties required. Now that we also have a much better understanding of Continuous Integration, we will be taking advantage of that workflow to better progress our work and integrate our modules while they are still flexible. Furthermore, we will be shifting more from discord to take advantage of communication through slack in order to keep our organizing in one convenient location and keep Hester Li and Professor Yu involved on our progress.

*Improving the Process*:

Now that we have gotten accustomed to our technologies and created our frameworks and founding products, we should be able to take what we've learned into our next sprint to maintain a more streamlined, smoother project flow. 

# React Basis

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
