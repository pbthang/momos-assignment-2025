import http from "http";
import express from "express";
import { Client } from "@notionhq/client";
import dotenv from "dotenv";

dotenv.config();

const notionDatabaseId = process.env.NOTION_DATABASE_ID || "";
const notionSecret = process.env.NOTION_DATABASE_SECRET || "";

if (!notionDatabaseId || !notionSecret) {
    throw Error("Must define NOTION_SECRET and NOTION_DATABASE_ID in env");
}

// Initializing the Notion client with your secret
const notion = new Client({
    auth: notionSecret,
});

const app = express();
app.use((_, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.get("/", async (req, res) => {
    const filterParam = req.query.filter as string | undefined;
    const sortsParam = req.query.sorts as string | undefined;
    const pageSizeParam = req.query.page_size as string | undefined;
    const startCursorParam = req.query.start_cursor as string | undefined;
    const queryArgs: Parameters<typeof notion.databases.query>[0] = {
        database_id: notionDatabaseId,
    };

    try {
        if (filterParam) {
            const filterDecoded = decodeURIComponent(filterParam);
            queryArgs.filter = JSON.parse(filterDecoded);
        }
        if (pageSizeParam) {
            queryArgs.page_size = parseInt(pageSizeParam, 10);
        }
        if (startCursorParam) {
            queryArgs.start_cursor = startCursorParam;
        }
        if (sortsParam) {
            const sortsDecoded = decodeURIComponent(sortsParam);
            queryArgs.sorts = JSON.parse(sortsDecoded);
        }
    } catch (err) {
        return res
            .status(400)
            .json({ error: "Invalid filter JSON", details: String(err) });
    }

    try {
        const response = await notion.databases.query(queryArgs);
        return res.json(response);
    } catch (err) {
        console.error("Notion query error:", err);
        return res
            .status(500)
            .json({ error: "Notion query failed", details: String(err) });
    }
});

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
