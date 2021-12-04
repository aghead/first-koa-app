const Koa = require('koa');
const Router = require('koa-router')
const render = require('koa-ejs')
const path = require('path')
const json = require('koa-json')
const bodyParser = require('koa-bodyparser')

const app = new Koa();
const router = new Router()


// how to use middleware
// app.use(async (ctx, next) => {
//     console.log("first")
//     await next()
//     console.log("first done")
// })
//
// app.use(async (ctx, next) => {
//     console.log("second")
//     await next()
//     console.log("second done")
// })
//

// app.use(async ctx => (ctx.body = "Hello PK"))

render(app, {
    root: path.join(__dirname, "views"),
    layout: "template",
    viewExt: "html",
    cache: false,
    debug: false,
    async: false
})

// Index Page
const users = ["Virat", "Sachin", "Rohit", "Dhoni"];

router.get('/', async ctx => {
    await ctx.render("index", {
        title: 'Hello Koa App',
        users: users
    });
})

// Add Page
router.get('/add', async ctx => {
    await ctx.render("add", {
        title: 'Add New Item'
    });
})

router.post('/add', async ctx => {
    const body = ctx.request.body
    users.push(body.user)

    // redirect to home page
    ctx.redirect('/')
})


router.get("/pk", ctx => {
    ctx.body = {
        name: "Hello PK"
    }
})

router.get("/pk/:id", ctx => {
    ctx.body = {
        name: `Hello ${ctx.params.id}`
    }
    return (ctx.status = 200)
})


// json prettier middleware
app.use(json())

// body parser middleware
app.use(bodyParser())

// router middleware
app.use(router.routes()).use(router.allowedMethods())

app.listen(3000)