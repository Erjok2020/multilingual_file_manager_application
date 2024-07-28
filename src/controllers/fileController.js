const File = require('../models/fileModel');

exports.createFile = async (req, res) => {
    const { name, type, size, content } = req.body;
    const userId = req.user.id;

    try {
        const newFile = await File.create({ name, type, size, content, userId });
        res.status(201).json(newFile);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create file' });
    }
};

exports.getFiles = async (req, res) => {
    const userId = req.user.id;

    try {
        const files = await File.findAll({ where: { userId } });
        res.json(files);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch files' });
    }
};

exports.updateFile = async (req, res) => {
    const { id } = req.params;
    const { name, type, size, content } = req.body;
    const userId = req.user.id;

    try {
        const file = await File.findOne({ where: { id, userId } });
        if (!file) return res.status(404).json({ error: 'File not found' });

        file.name = name;
        file.type = type;
        file.size = size;
        file.content = content;
        await file.save();

        res.json(file);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update file' });
    }
};

exports.deleteFile = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const file = await File.findOne({ where: { id, userId } });
        if (!file) return res.status(404).json({ error: 'File not found' });

        await file.destroy();
        res.json({ message: 'File deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete file' });
    }
};
