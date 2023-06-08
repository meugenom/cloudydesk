package dev.neetcloud.api.dir.service;

import dev.neetcloud.api.dir.model.Dir;
import dev.neetcloud.api.dir.model.GraphNode;
import dev.neetcloud.api.dir.repository.DirRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Iterator;
import java.util.List;

@RequiredArgsConstructor
@Service
public class DirServiceImpl implements DirService {

    private final DirRepository dirRepository;

    @Override
    public List<Dir> getAllDirs(Long createdUserId) {
        return dirRepository.findByCreatedUserId(createdUserId);
    }

    @Override
    public List<Dir> getAllDirs(Long createdUserId, String name) {
        return dirRepository.findByCreatedUserIdAndDirName(createdUserId, name);
    }

    @Override
    public Dir addDir(Long createdUserId, String name, Long parentId) {
        Dir dir = new Dir();
        dir.setDirName(name);
        dir.setCreatedUserId(createdUserId);
        dir.setDirectory(true);
        dir.setParentId(parentId);
        return dirRepository.save(dir);
    }

    @Override
    public void addDefaultDirs(Long createdUserId) {

        // add root dir
        Dir root = new Dir();
        root.setDirName("/");
        root.setCreatedUserId(createdUserId);
        root.setDirectory(true);
        root.setParentId(0L);
        dirRepository.save(root);

        // get root id from saved root
        root = (Dir) dirRepository.findByCreatedUserIdAndDirName(createdUserId, "/").get(0);

        // add root/apps
        Dir apps = new Dir();
        apps.setDirName("Apps");
        apps.setCreatedUserId(createdUserId);
        apps.setDirectory(true);
        apps.setParentId(root.getId());
        dirRepository.save(apps);

        // add root/desktop
        Dir desktop = new Dir();
        desktop.setDirName("Desktop");
        desktop.setCreatedUserId(createdUserId);
        desktop.setDirectory(true);
        desktop.setParentId(root.getId());
        dirRepository.save(desktop);

        // add root/docs
        Dir docs = new Dir();
        docs.setDirName("Docs");
        docs.setCreatedUserId(createdUserId);
        docs.setDirectory(true);
        docs.setParentId(root.getId());
        dirRepository.save(docs);

        // add root/shared
        Dir shared = new Dir();
        shared.setDirName("Shared");
        shared.setCreatedUserId(createdUserId);
        shared.setDirectory(true);
        shared.setParentId(root.getId());
        dirRepository.save(shared);

        // add root/trash
        Dir trash = new Dir();
        trash.setDirName("Trash");
        trash.setCreatedUserId(createdUserId);
        trash.setDirectory(true);
        trash.setParentId(root.getId());
        dirRepository.save(trash);

    }

    @Override
    public Long getParentId(Long id) {
        // gte parentId by dir id
        return ((Dir) dirRepository.findById(id).get()).getParentId();
    }

    @Override
    public Long getRootId(Long createdUserId) {
        // get root id by createdUserId
        return ((Dir) dirRepository.findByCreatedUserIdAndDirName(createdUserId, "/").get(0)).getId();
    }

    /**
     * DFS add child node to parent node
     * 
     * @param node     current node, by default it's root node
     * @param parentId parent id of child node
     * @param child    child node
     * @param root     root node, by default it's root node
     * @return root node
     */
    public GraphNode<Dir> dfsAddChild(
            GraphNode<Dir> node,
            Long parentId,
            GraphNode<Dir> child,
            GraphNode<Dir> root) {
        if (node.getData().getId().equals(parentId)) {
            node.addChild(child);
            return root;
        }
        for (GraphNode<Dir> n : node.getChildren()) {
            GraphNode<Dir> result = dfsAddChild(n, parentId, child, root);
            if (result != null) {
                return result;
            }
        }
        return null;
    }

    @Override
    public GraphNode<Dir> getDirTree(Long createdUserId) {

        // get all dirs by createdUserId
        List<Dir> allDirs = this.getAllDirs(createdUserId);

        // get root id by createdUserId
        Long rootId = this.getRootId(createdUserId);

        // get root dir
        Dir rootDir = (Dir) dirRepository.findById(rootId).get();

        // create root GraphNode
        GraphNode<Dir> rootGraphNode = new GraphNode<Dir>(rootDir);

        // make iterator for allDirs
        Iterator<Dir> it = allDirs.iterator();

        while (it.hasNext()) {
            Dir currentDir = it.next();
            if (currentDir.getId() != rootId && currentDir.getParentId().equals(rootId)) {
                GraphNode<Dir> parentGraphNode = new GraphNode<Dir>(currentDir);
                rootGraphNode = this.dfsAddChild(rootGraphNode, rootId, parentGraphNode, rootGraphNode);
                it.remove();
            }
        }

        return rootGraphNode;
    }

}
