(function () {
    'use strict';

    angular.module('search-algorithms')
        .factory('BinaryTree', function () {
            var _id = 1;

            var BinaryTree = function () {
                this._root = null;
                this._svg = null;
            };

            BinaryTree.prototype = {
                constructor: BinaryTree,
                add: function (value) {
                    var node = {
                        value: value,
                        left: null,
                        right: null,
                        id: _id++
                    },
                        current;

                    if (this._root === null) {
                        node.orientaion = 'root';
                        this._root = node;
                    } else {
                        current = this._root;

                        while (true) {
                            if (value < current.value) {
                                if (current.left === null) {
                                    node.orientaion = 'left';
                                    current.left = node;
                                    break;
                                } else {
                                    current = current.left;
                                }
                            } else if (value > current.value) {
                                if (current.right === null) {
                                    node.orientation = 'right';
                                    current.right = node;
                                    break;
                                } else {
                                    current = current.right;
                                }
                            } else {
                                break;
                            }
                        }
                    }
                },
                traverse: function (process) {
                    function inOrder (node) {
                        if (node) {
                            if (node.left !== null) {
                                inOrder(node.left);
                            }

                            process.call(this, node);

                            if (node.right !== null) {
                                inOrder(node.right);
                            }
                        }
                    }

                    inOrder(this._root);
                },
                draw: function () {
                    var _id = 1;

                    var width = 1024,
                        height = 600,
                        tree = d3.layout.tree()
                        .size([width - 10, height - 70]);

                    var diagonal = d3.svg.diagonal(),
                        svg = d3.select('#binary-tree').append('svg')
                            .attr('width', width)
                            .attr('height', height)
                            .append('g')
                                .attr('transform', 'translate(10, 25)');

                    var tree_nodes = tree.nodes(this.toJSON()),
                        links = tree.links(tree_nodes);

                    var node = svg.selectAll('.node')
                        .data(tree_nodes, function (d) {
                            return d.id;
                        });

                    node.append('circle')
                        .attr('r', function (d) {
                            return Math.max(d.name ? d.name.length * 6 : 15, 15);
                        })
                        .style('stroke', function (d) {
                            return d.name ? '#000' : 'white';
                        }).style('stroke-width', 1);


                    var g = node.enter().append('g')
                        .attr('class', function (d) {
                            console.log('g', d);
                            return 'node nd_' + d.id;
                        })
                        .attr('transform', function (d) {
                            var x = d.x,
                                y = d.y;

                            if (d.parent) {
                                x = d.parent.x;
                                y = d.parent.y;
                            }

                            return 'translate(' + x + ', ' + y + ')';
                        });

                    node.transition().duration(500)
                            .attr('transform', function (d) {
                                return 'translate(' + d.x + ', ' + d.y + ')';
                            });

                    g.append('circle')
                        .attr('r', function (d) {
                            return Math.max(d.name ? d.name.length * 6 : 15, 15);
                        })
                        .style('stroke', function (d) {
                            return d.name ? '#000' : 'white';
                        });

                    g.append('text')
                        .text(function (d) {
                            return d.name;
                        })
                        .attr('dx', function (d) {
                            return d.name ? - (d.name.length * 5) : 0;
                        })
                        .attr('dy', 5);

                    var link = svg.selectAll('.link')
                            .data(links, function (d) {
                                return d.source.id + '-' + d.target.id;
                            });

                     link.enter().insert('path', 'g')
                            .attr('class', function (d) {
                                var source = d.source;

                                return 'link ld_' + (d.source.id + '-' + d.target.id);
                            })
                            .style('stroke', function (d) {
                                return d.target.name ? 'black' : 'white';
                            })
                            .style('stroke-width', 1)
                            .attr('d', function (d) {
                                console.log('Link-attr', d);
                                var o = {x: d.source.x, y: d.source.y};
                                return diagonal({source: o, target: o});
                            })
                            .transition()
                            .duration(500)
                            .attr('d', diagonal);

                    link.transition()
                        .duration(500)
                        .attr('d', diagonal);

                    link.exit().transition().duration(500)
                            .style('stroke', 'white')
                            .attr('d', function (d) {
                                var o = {x: d.source.x, y: d.source.y},
                                    w = d.source.right === d.target ? width : 0;

                                return diagonal({
                                    source: o,
                                    target: {x: w, y: height}
                                });
                            })
                        .remove();


                    node.exit().transition().duration(500)
                            .style('fill', 'white')
                            .attr('transform', function (d) {
                                if (d.orientation === 'root') {
                                    return 'translate(' + d.x + ', ' + height + ')';
                                }
                                var w = d.orientation === 'left' ? 0 : width;
                                return 'translate(' + w + ', ' + height + ')';
                            })
                        .remove();

                    svg.selectAll('.node text')
                        .transition().duration(500).style('fill', 'blue');
                    this._svg = svg;
                },
                color: function (first_id, second_id) {
                    var svg = this._svg;

                    svg.selectAll('g.nd_' + first_id + ' circle')
                        .transition().duration(500)
                        .style('stroke', 'red').style('stroke-width', 3);

                    if (second_id !== 0) {
                        console.log('path.ld_' + first_id + '-' + second_id);

                        svg.selectAll('path.ld_' + first_id + '-' + second_id)
                            .transition().duration(500)
                            .style('stroke', 'red').style('stroke-width', 3);
                    }
                },
                depth_first_search: function (value, node) {
                    var found = false,
                        svg = this._svg,
                        current;

                    console.log('Valor', value);
                    if (node === undefined) {
                        current = this._root;

                        svg.selectAll('.node circle')
                            .transition().duration(500)
                            .style('stroke', 'black').style('stroke-width', 1);

                        svg.selectAll('.link')
                            .transition().duration(500)
                            .style('stroke', 'black').style('stroke-width', 1);

                        svg.selectAll('.node text')
                            .transition().duration(500).style('fill', 'blue');
                    } else {
                        current = node;
                    }

                    if (value < current.value) {
                        this.color(current.id, current.left ? current.left.id : 0);
                        this.depth_first_search(value, current.left);
                    } else if (value > current.value) {
                        this.color(current.id, current.right ? current.right.id : 0);
                        this.depth_first_search(value, current.right);
                    } else {
                        this.color(current.id);
                        svg.selectAll('g.nd_' + current.id + ' text').transition().delay(500).style('fill', 'red');
                        found = true;

                        return found;
                    }
                },
                breadth_first_search: function (value) {
                    var queue = [];

                    queue.push(this._root);

                    this._svg.selectAll('.node circle')
                        .transition().duration(500)
                        .style('stroke', 'black').style('stroke-width', 1);

                    this._svg.selectAll('.link')
                        .transition().duration(500)
                        .style('stroke', 'black').style('stroke-width', 1);

                    this._svg.selectAll('.node text')
                        .transition().duration(500).style('fill', 'blue');

                    while (queue.length) {
                        var current = queue.shift();
                        this.color(current.id);
                        if (current.value === value) {
                            this._svg.selectAll('g.nd_' + current.id + ' text').transition().delay(500).style('fill', 'red');
                            return true;
                        }

                        if (current.left) {
                            this.color(current.id, current.left.id);
                            queue.push(current.left);
                        }

                        if (current.right) {
                            this.color(current.id, current.right.id);
                            queue.push(current.right);
                        }
                    }
                },
                size: function () {
                    var length = 0;

                    this.traverse(function (node) {
                        length++;
                    });

                    return length;
                },
                toArray: function () {
                    var result = [];

                    this.traverse(function (node) {
                        result.push(node.value);
                    });

                    return result;
                },
                toString: function () {
                    return this.toArray().toString();
                },
                toJSON: function (node) {
                    var result = {};

                    if (node === undefined) {
                        result.name = this._root.value;
                        result.id = this._root.id;

                        if (this._root.left !== null) {
                            if (this._root.right !== null) {
                                result.children = [
                                    this.toJSON(this._root.left),
                                    this.toJSON(this._root.right)
                                ];
                            } else {
                                result.children = [
                                    this.toJSON(this._root.left)
                                ]
                            }
                        } else if (this._root.right !== null) {
                            result.children = [
                                this.toJSON(this._root.right)
                            ]
                        }
                    } else {
                        result.name = node.value;
                        result.id = node.id;

                        if (node.left !== null) {
                            if (node.right !== null) {
                                result.children = [
                                    this.toJSON(node.left),
                                    this.toJSON(node.right)
                                ];
                            } else {
                                result.children = [
                                    this.toJSON(node.left)
                                ]
                            }
                        } else if (node.right !== null) {
                            result.children = [
                                this.toJSON(node.right)
                            ]
                        }
                    }

                    return result;
                }
            };

            return BinaryTree;
        });

    // BinaryTree.prototype = {
    //     constructor: function () {
    //         this._root = null;
    //     },
    //     add: function (value) {
    //         var node = {
    //             value: value,
    //             left: null,
    //             right: null
    //         };
    //
    //         if (this._root === null) {
    //             this._root = node;
    //         } else {
    //             current = this._root;
    //
    //             while (true) {
    //                 if (value < current.value) {
    //                     if (!current.left) {
    //                         current.left = node;
    //                         break;
    //                     } else {
    //                         current = current.left;
    //                     }
    //                 } else if (value > current.value) {
    //                     if (!current.right) {
    //                         current.right = node;
    //                         break;
    //                     } else {
    //                         current = current.right;
    //                     }
    //                 } else {
    //                     break;
    //                 }
    //             }
    //         }
    //     },
    //     contains: function (value) {
    //         var found = false,
    //             current = this._root;
    //
    //         while (!found && current) {
    //             if (value < current.value) {
    //                 current = current.left;
    //             } else if (value > current.value) {
    //                 current = current.right;
    //             } else {
    //                 found = true;
    //             }
    //         }
    //
    //         return found;
    //     },
    //     traverse: function (process) {
    //         function inOrder(node) {
    //             if (node) {
    //                 if (node.left) {
    //                     inOrder(node.left);
    //                 }
    //
    //                 process(this, node);
    //
    //                 if (node.right) {
    //                     inOrder(node.right);
    //                 }
    //             }
    //         }
    //
    //         inOrder(this._root);
    //     },
    //     remove: function (value) {
    //
    //     },
    //     size: function () {
    //         var length = 0;
    //
    //         this.traverse(function (node) {
    //             length++;
    //         });
    //
    //         return length;
    //     },
    //     toArray: function () {
    //         var result = [];
    //
    //         this.traverse(function (node) {
    //             result.push(node.value);
    //         });
    //
    //         return result;
    //     },
    //     toString: function () {
    //         return this.toArray().toString();
    //     }
    // }
})();