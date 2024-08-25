const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;
app.use(cors());
app.use(bodyParser.json());

const userInfo = {
  user_id: "varunsood_21BCE2516",
  email: "soodvarun2003@gmail.com",
  roll_number: "21BCE2516"
};

app.post('/bfhl', (req, res) => {
  const { data } = req.body;

  if (!Array.isArray(data)) {
    return res.status(400).json({
      is_success: false,
      error: "Invalid input. 'data' should be an array."
    });
  }

  let numbers = [];
  let alphabets = [];
  let highestLowercaseAlphabet = "";

  data.forEach(item => {
    if (!isNaN(item)) {
      numbers.push(item);
    } else if (typeof item === 'string') {
      alphabets.push(item);
      if (item === item.toLowerCase() && (!highestLowercaseAlphabet || item > highestLowercaseAlphabet)) {
        highestLowercaseAlphabet = item;
      }
    }
  });

  res.json({
    is_success: true,
    user_id: userInfo.user_id,
    email: userInfo.email,
    roll_number: userInfo.roll_number,
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : []
  });
});

app.get('/bfhl', (req, res) => {
  res.json({ operation_code: 1 });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
