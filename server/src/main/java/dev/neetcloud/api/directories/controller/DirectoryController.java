package dev.neetcloud.api.directories.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.neetcloud.api.directories.model.DirStructure;
import dev.neetcloud.api.directories.model.DirNode;

@RestController
@RequestMapping("/directories")
public class DirectoryController {
    private DirStructure directoryStructure;

    @Autowired
    public DirectoryController(DirStructure directoryStructure) {
        this.directoryStructure = directoryStructure;
    }

    @GetMapping("/")
    public DirNode getDirectoryStructure() {
        return directoryStructure.getRoot();
    }
}
