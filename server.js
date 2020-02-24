/* Configurações para retorno de resposta e entrada no servidor */


/* Configurações do servidor */
const express = require("express")
const server = express()


/* Configurações do servidor para aqruivos extras*/
server.use(express.static('public'))


/* Habilitar body no formulário, extender conteúdo pelo bpdy completo */
server.use(express.urlencoded( {extends: true} ))


/* Configurar com o database */
const Pool = require('pg').Pool
const db = new Pool({
    user: 'postgres',
    password: 'gigio123456',
    host: 'locahost',
    port: 5432,
    database: 'doe'
})

/* Configurações a template engine */
const nunjucks = require("nunjucks") 
nunjucks.configure("./", {
  express: server,
  noCache: true,

})


/* lista de doadores: vetor ou Array */


/* Configurações da apresentação da página
Get: servir, enviar, buscar dados web*/
server.get("/", function(req, res){
    
    db.query("SELECT * FROM donors", function(err, result){
        if(err)
            return res.send("Erro de banco de dados")
            const donors = result.rows
            return res.render("index.html", {donors})
        
    })
})

/* Configurações da apresentação da página
Post: guardar dados web*/

server.post("/", function(req, res) {
  // pegar dados do formulário
    const name = req.body.name
    const email = req.body.email
    const blood = req.body.blood

    //colocar valores dentro do database
    
    if(name == "" || email == "" || blood == ""){
        return res.send("Todos os campos são obrigatórios")
    }
    
    const query = `
    INSERT INTO donors ("name", "email", "blood") 
    VALUES ($1, $2, $3)`

    const values = [name, email, blood]

    db.query(query,  values , function(err){
        if (err) {
            return res.send("erro no banco de dados")
        }
        return res.redirect("/")
    })


})


/* Acesso ao servidor, porta 3000 , mudanças no package json também*/
server.listen(3000, function(){
    console.log("iniciamos o servidor")
})

//Configurações para retorno de resposta e entrada no servidor 