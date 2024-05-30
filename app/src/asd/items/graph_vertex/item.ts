namespace App.ASD.Items{
    type GraphVertexConnectionType = {isOriented: boolean, weight: number};
    type GraphVertexConnectionMapType = Map<GraphVertex, GraphVertexConnectionType>;
    type GraphVertexConnectionIndexType = {index: number, weight: number};

    export type GraphVertexConnectionsType = {from: GraphVertexConnectionMapType, to: GraphVertexConnectionMapType};
    export type GraphVertexObjectType = {title: string, center: Utils.VectorObjectType, connectionsIndexes: GraphVertexConnectionIndexType[]};

    export class GraphVertex extends BaseItem<IGraphVertex>{
        public readonly graphicsManager: Graphics.GraphVertexGraphicsManager;
        public readonly title: string;
        public readonly center: Readonly<Utils.Vector>;

        private readonly _connections: GraphVertexConnectionsType;

        public constructor(title: string, center: Utils.Vector){
            super();

            this.title = title;
            this.center = center;
            this._connections = {from: new Map(), to: new Map()};

            this.graphicsManager = new Graphics.GraphVertexGraphicsManager(this, this._connections);
        }

        public checkConnection(vertex: GraphVertex): boolean{
            return this._connections.from.has(vertex);
        }

        public getConnection(vertex: GraphVertex): GraphVertexConnectionType | null{
            const connection = this._connections.from.get(vertex);
            return (connection !== undefined) ? {...connection} : null;
        }

        public getConnections(): GraphVertexConnectionsType{
            return {
                from: new Map(this._connections.from),
                to: new Map(this._connections.to)
            };
        }

        public toObject(items: GraphVertex[]): GraphVertexObjectType{
            const obj: GraphVertexObjectType = {
                title: this.title,
                center: this.center.toObject(),
                connectionsIndexes: []
            };

            for (const [item, connection] of this._connections.from){
                obj.connectionsIndexes.push({index: items.indexOf(item), weight: connection.weight});
            }

            return obj;
        }

        public connect(isOriented: boolean, weight: number, vertex: GraphVertex): void;
        public connect(connections: GraphVertexConnectionsType): void;

        public connect(arg: boolean | GraphVertexConnectionsType, weight?: number, vertex?: GraphVertex){
            if (typeof arg === 'boolean' && typeof weight === 'number' && vertex instanceof GraphVertex){
                if ((arg || (!arg && !this._connections.to.has(vertex))) && !this._connections.from.has(vertex)){
                    this._connections.from.set(vertex, {isOriented: arg, weight});
                    vertex._connections.to.set(this, {isOriented: arg, weight});

                    if (!arg){
                        this._connections.to.set(vertex, {isOriented: arg, weight});
                        vertex._connections.from.set(this, {isOriented: arg, weight});
                    }

                    this.graphicsManager.connect(arg, weight, vertex);
                }
            }
            else if (typeof arg === 'object'){
                for (const [vertex, obj] of arg.from){
                    this.connect(obj.isOriented, obj.weight, vertex);
                }

                for (const [vertex, obj] of arg.to){
                    vertex.connect(obj.isOriented, obj.weight, this);
                }
            }
        }

        public disconnect(vertex: GraphVertex): void;
        public disconnect(connections: GraphVertexConnectionsType): void;

        public disconnect(arg: GraphVertex | GraphVertexConnectionsType){
            if (arg instanceof GraphVertex){
                const connection = this._connections.from.get(arg);

                if (connection !== undefined){
                    this._connections.from.delete(arg);
                    arg._connections.to.delete(this);

                    if (!connection.isOriented){
                        this._connections.to.delete(arg);
                        arg._connections.from.delete(this);
                    }

                    this.graphicsManager.disconnect(connection.isOriented, arg);
                }
            }
            else{
                for (const [vertex] of arg.from){
                    this.disconnect(vertex);
                }

                for (const [vertex] of arg.to){
                    vertex.disconnect(this);
                }
            }
        }
    }
}