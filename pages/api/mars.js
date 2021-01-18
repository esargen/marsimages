import axios from "axios";

const API_KEY = process.env.API_KEY;


export default async function marsHandler(req, res) {

const results = []
  if (!req.query.rover) {
    console.log("req.query.rover", req.query.rover);
    return res.status(400).json({ error: "Bad Request" });
  }
  if (!req.query.camera) {
    console.log("req.query.camera", req.query.camera);
    return res.status(400).json({ error: "Bad Request" });
  }
  if (!req.query.formattedDate) {
    console.log("req.query.formattedDate", req.query.formattedDate);
    return res.status(400).json({ error: "Bad Request" });
  }
    if (results.length <= 19){
      try {
            const response = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${req.query.rover}/photos?earth_date=${req.query.formattedDate}&camera=${req.query.camera}&api_key=${API_KEY}`);
            const photosdata = response.data.photos;
            for (const photosdatum of photosdata) {
              results.push(photosdatum);
            };

          } catch (error) {
            console.log("ERROR:", error)
          }
    }
    return res.status(200).json({ message: "OK", results: results });

}
