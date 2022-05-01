const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
class BinarySearchTree {
  constructor() {
    this.rootTree = null;
  }
  root() {
    return this.rootTree;
  }

  add(value) {
    this.rootTree = addNode(this.rootTree, value);

    function addNode(node, value) {
      if (!node) {
        return new Node(value);
      }

      if (node.value === value) {
        return node;
      }

      if (value < node.value) {
        node.left = addNode(node.left, value);
      } else {
        node.right = addNode(node.right, value);
      }

      return node;
    }
  }

  has(value) {
    return search(this.rootTree, value);

    function search(node, value) {
      if (!node) {
        return false;
      }

      if (node.value === value) {
        return true;
      }

      if (value < node.value) {
        return search(node.left, value);
      } else {
        return search(node.right, value);
      }
    }
  }

  find(value) {
    return searchNode(this.rootTree, value);

    function searchNode(node, value) {
      if (!node) {
        return null;
      }

      if (node.value === value) {
        return node;
      }

      if (value < node.value) {
        return searchNode(node.left, value);
      } else {
        return searchNode(node.right, value);
      }
    }
  }

  remove(value) {
    this.rootTree = removeNode(this.rootTree, value);

    function removeNode(node, value) {
      if (!node) {
        return null;
      }

      if (value < node.value) {
        node.left = removeNode(node.left, value);
        return node;
      } else if (value > node.value) {
        node.right = removeNode(node.right, value);
        return node;
      } else {
          // проверка на лист
        if (!node.left && !node.right) {
          return null;
        }

        if (!node.left) {
          node = node.right;
          return node;
        }

        if (!node.right) {
          node = node.left;
          return node;
        }

        // min children 
        let minChildren = node.right;
        while (minChildren.left) {
          minChildren = minChildren.left;
        }

        node.value = minChildren.value;

        node.right = removeNode(node.right, minChildren.value);

        return node;
      }
    }
  }

  min() {
    if (!this.rootTree) {
      return;
    }

    let node = this.rootTree;
    // find while node.left not min
    while (node.left) {
      node = node.left;
    }

    return node.value;
  }

  max() {
    if (!this.rootTree) {
      return;
    }

    let node = this.rootTree;
    // find while node.right not max
    while (node.right) {
      node = node.right;
    }

    return node.value;
  }
}

module.exports = {
  BinarySearchTree
};