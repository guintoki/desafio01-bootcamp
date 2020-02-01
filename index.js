const express = require('express');

const server = express();

server.use(express.json());

const projects = [];

function checkIfIdIsValid(req, res, next) {
    const { id } = req.params;

    let project = projects.find(proj => proj.id == id);

    if (!project && id)
        return res.status(404).json({ error: "Project not find" });

    next();
}


/// Adicionar novo projeto
server.post('/projects', (req, res) => {
    const { id, title } = req.body;

    const project = {
        id,
        title,
        tasks: []
    };

    projects.push(project);

    return res.json(project);
});

/// Listar todos os projetos
server.get('/projects', (req, res) => {
    return res.json(projects);
});


/// Buscar usuário com id informado
server.put('/projects/:id', checkIfIdIsValid, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    let project = projects.find(proj => proj.id == id);
    project.title = title;

    return res.json(projects);
});

/// Deletar usuário a partir do ID informado
server.delete('/projects/:id', checkIfIdIsValid, (req, res) => {
    const { id } = req.params;

    let index = projects.findIndex(proj => proj.id == id);
    projects.splice(index, 1);

    return res.json(projects);
});


/// 
server.post("/projects/:id/tasks", checkIfIdIsValid, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    let project = projects.find(proj => proj.id == id);

    project.tasks.push(title);

    return res.json(project);
});

server.listen(3000);