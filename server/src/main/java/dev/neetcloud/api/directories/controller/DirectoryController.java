package dev.neetcloud.api.directories.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.neetcloud.api.directories.model.DirectoryStructure;
import dev.neetcloud.api.directories.model.FileNode;

@RestController
@RequestMapping("/directory")
public class DirectoryController {
    private DirectoryStructure directoryStructure;

    @Autowired
    public DirectoryController(DirectoryStructure directoryStructure) {
        this.directoryStructure = directoryStructure;
    }

    @GetMapping("/")
    public FileNode getDirectoryStructure() {
        return directoryStructure.getRoot();
    }
}
