package dev.neetcloud.api.directories.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import dev.neetcloud.api.directories.repository.FileNodeRepository;

@Component
public class DirectoryStructure {
    private FileNodeRepository fileNodeRepository;

    @Autowired
    public DirectoryStructure(FileNodeRepository fileNodeRepository) {
        this.fileNodeRepository = fileNodeRepository;
    }

    public void addDirectory(String path) {
        // Same implementation as before
    }

    public void addFile(String path, String fileName) {
        // Same implementation as before
    }

    public FileNode getRoot() {
        return fileNodeRepository.findById(1L).orElse(null);
    }
}
