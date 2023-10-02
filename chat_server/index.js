const config = require('./config');

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const PORT = config.PORT ?? 3001;
const app = express();

const WSServer = require('express-ws')(app);

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: config.CLIENT_URL }));

const userRouter = require('./routes/userRouter');
app.use('/api', userRouter);

const wsChatRouter = require('./routes/wsChatRouter');
app.use('/ws-api', wsChatRouter);

const errorMiddleware = require('./middleware/errorMiddleware');
app.use(errorMiddleware);

app.listen(PORT, () => console.log('Working on', PORT));
