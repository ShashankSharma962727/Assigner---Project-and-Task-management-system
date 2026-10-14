const app = require("./src/app.js");
const connectDB = require("./src/db/connection.js");

const startServer = async () => {
    try {
        await connectDB(process.env.MONGO_URI);

        const PORT = process.env.PORT || 5000;

        app.listen(PORT, () => {
            console.log(`Server Started on port ${PORT}`);
        });
    } catch (error) {
        console.error("Server startup failed:", error);
        process.exit(1);
    }
};

startServer();