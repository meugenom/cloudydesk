package dev.neetcloud.api.dir.model;

import java.util.ArrayList;
import java.util.List;

/**
 * It's a directed acyclic graph (DAG).
 * In a DAG, each node represents a directory or file, and each edge represents
 * a parent-child relationship between directories.
 */

public class GraphNode<T> {
    private T data;
    private List<GraphNode<T>> children;

    public GraphNode(T data) {
        this.data = data;
        this.children = new ArrayList<>();
    }

    public T getData() {
        return data;
    }

    public void addChild(GraphNode<T> child) {
        children.add(child);
    }

    public List<GraphNode<T>> getChildren() {
        return children;
    }

    // DFS traversal print all children
    public static <T> void dfsTraversal(GraphNode<T> node) {
        System.out.println("GraphNode [data=" + node.getData() + ", children=" + node.getChildren() + "]");
        for (GraphNode<T> child : node.getChildren()) {
            dfsTraversal(child);
        }
    }

}