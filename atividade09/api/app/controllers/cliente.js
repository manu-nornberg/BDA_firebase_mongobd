import * as model from '../models/clientesDAO.js'

const index = async (req, res) => {
    let listCli
    console.log(req.query)
    if (req.query.order) {
        let orderBy = req.query.order
        let reverse = +req.query.reverse ? true : false
        listCli = await model.getAllCliente(orderBy, reverse);
    } else if (req.query.field && req.query.search) {
        listCli = await model.getFilteredCliente(req.query.field, req.query.search);
    } else {
        listCli = await model.getAllCliente();
    }
    if (!listCli)
        return res.status(404).send({ "message": "Sem resultados" })
    res.send(listCli);
}

const show = async (req, res)=>{
    console.log(req.params.id)
    const cliente = await model.getClienteById(req.params.id)
    console.log(cliente)
    if(!cliente){
        res.status(404);
    }else {
        res.send(cliente)
    }
}   

const store = async (req, res) => {
    try {
        const formData = req.body;
        console.log("controller:",formData, req.body)
        console.log("controller:",formData, { ...req.body })
        const cliente = {
            id_cliente: +formData.id_cliente,
            nome: formData.nome,
            cpf: formData.cpf,
            email: formData.email
        }

        console.log(cliente);
        if (await model.insertCliente(cliente))
            res.send({
                mensagem: "cliente inserido!!",
                cliente: cliente
            })
        else throw new Error("Erro ao inserir cliente!")
    } catch (error) {
        const mensagem = { erro: error }
        console.log(mensagem)
        res.status(500);
        res.send(mensagem)
    } 
}

const update = async (req, res) => {
    try {
        const formData = req.body;
        console.log({ query: req.params, body: formData })

        if (!req.params.id || req.params.id == 'undefined')
            throw new Error("O ID do cliente é obrigatório")

        const newCliente = {...formData}
        console.log({newCliente})
        newCliente.id_cliente = +req.params.id

        if (!(await model.updateCliente(newCliente)))
            throw new Error("Erro ao atualizar cliente!")
        res.send({
            mensagem: "Cliente Atualizado!!",
            cliente: newCliente
        })
    } catch (error) {
        console.log(error)
        res.status(500);
        res.send({ Error: error.message })
    }
}

const remove = async (req, res) => {
    let status = 500;
    try {
        console.log({ query: req.params })
        if (!req.params.id || !req.params.id === 'undefined') {
            res.status = 400;
            throw new Error("Erro, falta o parâmetro ID na url!")
        }
        const id = parseInt(req.params.id)
        if (!(await model.deleteCliente(id)))
            throw new Error("Erro ao remover o cliente!")
        res.send({
            success: `Cliente ID:${id}  removido com sucesso!`,
        })
    } catch (error) {
        console.log(error)
        res.status(status);
        res.send({ Error: error.message })
    }
}


export { index, show, store, update, remove }