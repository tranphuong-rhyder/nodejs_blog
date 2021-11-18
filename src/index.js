const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

//middleware
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

// HTTP logger
// app.use(morgan('combined'));

// Template engie
app.engine('hbs', handlebars({
    extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources\\views'));


// đường dẫn (Routing: giúp định nghĩa ra tuyến đường, cho web site, để tạo ra điểm truy cập vd: /news /...)
//(req, res) => {res.render('home'); }) function sẽ đc gọi lại khi dẫn đúng link (request, response)
//request => chứa những thông tin mà ứng dụng phía client yêu cầu lên trên server
//response => biến response giúp tùy chọn, cấu hình, setup cho vc trả về client, trả về như thế nào, trả về cái gì
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/news', (req, res) => {
    res.render('news');
});

app.get('/search', (req, res) => {
    //Query parameters: console.log(req.query.q);
    //Query parameters: search?q=f8%20lap%20trinh&ref=mycv&author=phuongtt
    res.render('search');
});

app.post('/search', (req, res) => {
    //form data: req.query
    console.log(req.body);
    res.send('');
});


// 127.0.0.1 - localhost

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})


// GET và POST là hai phương thức của giao thức HTTP, đều là gửi dữ liệu về server xử lí sau khi người dùng nhập thông tin vào form và thực hiện submit. -
//     Phương thức GET:
//     +Gửi thông tin người dùng và đính lên đường dẫn URL. +
//     Băng thông của nó chỉ khoảng 1024 kí tự vì vây GET hạn chế về số kí tự được gửi đi. +
//     GET không thể gửi dữ liệu nhị phân, hình ảnh... +
//     Có thể cached và được bookmark(đánh dấu trên trình duyệt), lưu trong browser history. -
//     Phương thức POST:
//     +Truyền thông tin thông qua HTTP header. +
//     Dữ liệu rất bảo mật vì dữ liệu được gửi ngầm, không đưa lên URL, bằng việc sử dụng Secure HTTP. +
//     Parameters được truyền trong request body +
//     Có thể truyền dữ liệu lớn, hạn chế tùy thuộc vào cấu hình của Server. +
//     Không cache và bookmark được cũng như không được lưu lại trong browser history. + +Không hạn chế về kích thước dữ liệu khi gửi, có thể gửi dữ liệu nhị phân, hình ảnh.