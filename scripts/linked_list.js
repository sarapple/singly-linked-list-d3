//SINGLY LINKED LIST

//instantiate node class, and linkedlist where the nodes can be pointed to
var Node = function(text) {
	this.text = text || "";
	this.next = null;

	return this;
};

var LinkedList = function() {
	this.head = null;

	LinkedList.prototype.push = function(node) {
		var currentNode = this.head;

		if (!currentNode) {
			this.head = node;
			return;
		};

		while(currentNode.next) {
			currentNode = currentNode.next;
		}

		currentNode.next = node;
	};

	LinkedList.prototype.pop = function() {
		var currentNode = this.head;

		if (!currentNode) return;
		if (!currentNode.next) {
			this.head = null;

			return;
		};

		while(currentNode.next.next) {
			currentNode = currentNode.next;
		}

		currentNode.next = null;
	};

	LinkedList.prototype.shift = function(node) {
		var currentNode = this.head;

		if (!currentNode) {
			this.head = node;
			return;
		};

		this.head = node;
		this.head.next = currentNode;
	};

	LinkedList.prototype.unshift = function() {
		var currentNode = this.head;

		if (!currentNode) return;

		this.head = currentNode.next;
	};

	LinkedList.prototype.insert = function(position, node) {
		// beforeNode > node > afterNode
		var beforeNode = this.head,
				afterNode  = this.head;

		if (!beforeNode || position === 0) return this.shift(node);

		while (position) {
			position--;
			beforeNode = afterNode;
			afterNode = afterNode.next;
		};

		beforeNode.next = node;
		node.next = afterNode;
	};

	return this;
};
