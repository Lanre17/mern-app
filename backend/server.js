const path = require("path");
const express = require ("express")
const dotenv = require ("dotenv").config()
const cors = require("cors")
const { errorHandler } = require ("./middleware/errorMiddleware")
const connectDB = require ("./config/db")
const colors = require ("colors")
const port = process.env.PORT || 5000

connectDB()


const app = express()

app.use(express.json())
app.use(cors())
app.use(express.urlencoded( {extended: false} ))

app.use("/api/notes", require("./routes/noteRoutes"))

// Serve frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));
  
    app.get('*', (req, res) =>
      res.sendFile(
        path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
      )
    );
  } else {
    app.get('/', (req, res) => res.send('Please set to production'));
  }
app.use(errorHandler)


app.listen(port, ()=> console.log(`server running on port ${port}`))