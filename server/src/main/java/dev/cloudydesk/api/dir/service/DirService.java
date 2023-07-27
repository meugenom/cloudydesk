package dev.cloudydesk.api.dir.service;

import dev.cloudydesk.api.dir.model.GraphNode;
import dev.cloudydesk.api.dir.model.Dir;

import java.util.List;

public interface DirService {

    // gte all dirs by created user id
    public List<Dir> getAllDirs(Long createdUserId);

    // get all directories by created user id and name
    public List<Dir> getAllDirs(Long createdUserId, String name);

    // add new dir
    public Dir addDir(Long createdUserId, String name, Long parentId);

    // add defaults dirs for new user
    public void addDefaultDirs(Long createdUserId);

    // get parentId by dir's id
    public Long getParentId(Long id);

    // get root by createdUserId
    public Long getRootId(Long createdUserId);

    // get all dirs as a tree and files as values of dirs
    public GraphNode<Dir> getDirTree(Long createdUserId);

}
