import express from "express";
import bodyParser from "body-parser";
import sql from "msnodesqlv8";

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
const connectionString = "server=DSN1191137664;Database=test2;Trusted_Connection=Yes;Driver={Sql Server Native Client 11.0}";

//Leitura
//Buscar todos os registros
app.get("/produtos", (req, res) => {
    sql.query(connectionString, "SELECT * FROM produtos", (erro, rows) => {
        if (erro) {
            res.status(500).json("Erro Interno de Servidor");
        } else {
            res.status(200).json(rows);
        }
    });
});

//Buscar um registro específico
app.get("/produtos/:id", (req, res) => {
    const { id } = req.params;
    sql.query(connectionString, `SELECT * FROM produtos WHERE id = ${id}`, (erro, rows) => {
        if (erro) {
            res.status(500).json("Erro Interno do Servidor");
        } else {
            res.status(200).json(rows);
        }
    });
});

//Escrita
app.post("/produtos", (req, res) => {
    const { descricao, custo, preco } = req.body;
    sql.query(connectionString, `INSERT INTO carro VALUES ('${descricao}', '${custo}', '${preco}')`,
        (erro, rows) => {
            if (erro) {
                res.status(500).json("Erro Interno de Servidor");
            } else {
                res.status(201).json("Cadastrado com sucesso!");
            }
        }
    );
});

//Atualizar um registro
app.put("/produtos/:id", (req, res) => {
    const{id} = req.params;
    const {descricao, custo, preco} = req.body;
    sql.query(
        connectionString, 
        `UPDATE produtos SET descricao = '${descricao}', custo = '${custo}', preco = '${preco}' WHERE id = ${id};`,
        (erro, rows)=>{
            if(erro){
                res.status(500).json("Erro Interno de Servidor");
            }else{
                res.status(201).json("Produto atualizado com Sucesso");
            }
        }
    );
});

//Deletar um registro
app.delete("/produtos/:id", (req,res) => {
    const{id} = req.params;
    sql.query(
        connectionString,
        `DELETE FROM carro WHERE id = ${id}`,
        (erro, rows) => {
            if(erro){
                res.status(500).json("Erro Interno de Servidor");
            }else{
                res.status(201).json("Produto excluído com Sucesso!");
            } 
        }    
    )
});

//Inicia o servidor na porta definida e impore uma mensage no console.
app.listen(PORT, () => console.log(`Server rodando na porta ${PORT}`));