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
     * @param root     root node
     * @param rootId  root node id
     * @param child    child node
     * @param parentId parent node id
     * @return root node
     */
    public GraphNode<Dir> dfsAddChild(
            GraphNode<Dir> root,
            Long rootId,
            GraphNode<Dir> child,
            Long parentId) {
            
            System.out.println("root.id = " + rootId + ", parentId = " + parentId);

        if (rootId.equals(parentId)) {
            root.addChild(child);
            return root;
        }else {
            return helper(root,rootId, child, parentId);
        }
    }

    // recursive helper function for dfsAddChild()
    public GraphNode<Dir> helper  (
            GraphNode<Dir> root,
            Long rootId,
            GraphNode<Dir> child,
            Long parentId
    ){
        if(rootId.equals(parentId)) {
            root.addChild(child);
            return root;
        }else{
            for(GraphNode<Dir> node : root.getChildren()){
                helper(node, node.getData().getId(), child, parentId);
            }
        }
        return root;
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
            Long parentId = currentDir.getParentId();
            if (    
                currentDir.getId() != rootId 
                ) {
                GraphNode<Dir> parentGraphNode = new GraphNode<Dir>(currentDir);
                rootGraphNode = this.dfsAddChild(
                    rootGraphNode, 
                    rootId, 
                    parentGraphNode, 
                    parentId);
                it.remove();
            }
        }

        return rootGraphNode;
    }

}
