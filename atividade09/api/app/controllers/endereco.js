import * as model from '../models/enderecoDAO.js'

const index = async (req, res) => {
    let listEn
    console.log(req.query)
    if (req.query.order) {
        let orderBy = req.query.order
        let reverse = +req.query.reverse ? true : false
        listEn = await model.getAllEndereco(orderBy, reverse);
    } else if (req.query.field && req.query.search) {
        listEn = await model.getFilteredEndereco(req.query.field, req.query.search);
    } else {
        listEn = await model.getAllEndereco();
    }
    if (!listEn)
        return res.status(404).send({ "message": "Sem resultados" })
    res.send(listEn);
}

const show = async (req, res)=>{
    console.log(req.params.id)
    const endereco = await model.getEnderecoById(req.params.id)
    console.log(endereco)
    if(!endereco){
        res.status(404);
    }else {
        res.send(endereco)
    }
}   

const showCliente = async (req, res)=>{
    try{
        console.log(req.params.id)
        const endereco = await model.getEnderecoByIdC(req.params.id)
        console.log("endereco", endereco)
        if(!endereco){
            const mensagem = ("ID de cliente não encontrado")
            res.send(mensagem)
            res.status(404);
        }else {
            res.send(endereco)
        }

    }catch (error) {
        const mensagem = { erro: error }
        console.log(mensagem)
        res.status(404);
        res.send(mensagem)
    } 
}   

const store = async (req, res) => {
    try {
        const formData = req.body;
        console.log("controller:",formData, req.body)
        console.log("controller:",formData, { ...req.body })
        const endereco = {
            id_endereco: +formData.id_endereco,
            id_cliente: +formData.id_cliente,
            rua: formData.rua,
            numero: +formData.numero
        }

        console.log(endereco);
        if (await model.insertEndereco(endereco))
            res.send({
                mensagem: "endereco inserido!!",
                endereco: endereco
            })
        else throw new Error("Erro ao inserir endereco!")
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
            throw new Error("O ID do endereco é obrigatório")

        const newEndereco = {...formData}
        console.log({newEndereco})
        newEndereco.id_endereco = +req.params.id

        if (!(await model.updateEndereco(newEndereco)))
            throw new Error("Erro ao atualizar endereco!")
        res.send({
            mensagem: "Endereco Atualizado!!",
            endereco: newEndereco
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
        if (!(await model.deleteEndereco(id)))
            throw new Error("Erro ao remover o endereco!")
        res.send({
            success: `Endereco ID:${id}  removido com sucesso!`,
        })
    } catch (error) {
        console.log(error)
        res.status(status);
        res.send({ Error: error.message })
    }
}


export { index, show, showCliente, store, update, remove }