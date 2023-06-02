package dev.neetcloud.api.directories.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import dev.neetcloud.api.directories.repository.DirNodeRepository;

@Component
public class DirStructure {
    private DirNodeRepository dirNodeRepository;

    @Autowired
    public DirStructure(DirNodeRepository fileNodeRepository) {
        this.dirNodeRepository = dirNodeRepository;
    }

    public void addDirectory(String path) {
        // Same implementation as before
    }

    public void addFile(String path, String fileName) {
        // Same implementation as before
    }

    public DirNode getRoot() {
        return dirNodeRepository.findById(1L).orElse(null);
    }
}
