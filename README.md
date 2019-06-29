

Hotel Transylvania
=

**Before we start**
please make sure that you  have **[Node.js](https://nodejs.org/en/)** and **[npm](https://www.npmjs.com/get-npm)** installed on your machine.

**How to run it?**
- Open your terminal / command line and **[cd](https://en.wikipedia.org/wiki/Cd_%28command%29)** to this project's folder
- Run ``npm install``
- After installing all dependences, run ``npm run test`` to see result of different scenarios that being tested automatically for you.
- This should be enough for testing the **core** of my solution for this problem.

**To whom it may concern, the problem statement and my algorithm**
1. Problem statement: [can be found here](https://ibb.co/k9r6tXS)
2. My algorithm:
   While we have more guests let's do the following:
    a. if we have children or infats let's open a room and put as much as we can inside,
       we need to make sure that we have one adult also.
       if there is no more adults then we can hanlde this booking (it is our hotels regulations)
  
    b.  after finishing all infants and children we check if we still have any adults
        if yes we try to fit them on the rooms that we booked already (CRITICAL TO GET MIN NO OF ROOMS)
        if we could, then we are good enough to return the result
        if not, we may keep booking new rooms until every adult has his room
        UNLESS we reach our maximum no of rooms per booking