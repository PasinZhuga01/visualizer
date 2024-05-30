namespace App.ASD.Algorithms.Graphics{
    export class DijkstraGraphicsManager extends BaseGraphicsManager<IDijkstra>{
        private static readonly _HEADERS_POSITION: Readonly<Utils.Vector> = new Utils.Vector(1000, 60);
        private static readonly _DISTANCES_POSITION: Readonly<Utils.Vector> = new Utils.Vector(1000, 90);

        private static readonly _ITEMS_MARGIN: Readonly<Utils.Vector> = new Utils.Vector(50, 20);
        private static readonly _ITEMS_SIZE: Readonly<Utils.Vector> = new Utils.Vector(50, 20);

        private readonly _items: Items.GraphVertex[];

        private _isValidForShowDescriptions: boolean;

        private _currentItem: Items.GraphVertex | null;
        private _checkedItem: Items.GraphVertex | null;
        private _nearestItem: Items.GraphVertex | null;

        private _distanceY: number;

        public constructor(element: Dijkstra, items: Items.GraphVertex[]){
            const {COLORS} = GraphTraversalGraphicsManager;
            const {_DISTANCES_POSITION} = DijkstraGraphicsManager;

            super({
                element: element,
                viewSize: new Utils.Vector(1500, 500),
                graphics: {
                    'headers': new Visual.Graphics.GraphicMap(),
                    'distances': new Visual.Graphics.GraphicCollection(),
                    'line': new Visual.Graphics.Line(new Utils.Bounds(460, 20, 1000, 80), new Utils.Vector(1000, 80), new Utils.Vector(1460, 80)),

                    'current-item-distance-text': new Visual.Graphics.Text(new Utils.Bounds(100, 20, 1000, 10), 'current_distance:'),
                    'current-item-distance-value': new Visual.Graphics.Text(new Utils.Bounds(50, 20, 1098, 10), '0', {strokeColor: COLORS.current}),

                    'checked-item-distance-text': new Visual.Graphics.Text(new Utils.Bounds(100, 20, 1200, 10), 'checked_distance:'),
                    'checked-item-distance-value': new Visual.Graphics.Text(new Utils.Bounds(50, 20, 1305, 10), 'INF', {strokeColor: COLORS.check}),

                    'result-description': new Visual.Graphics.Text(new Utils.Bounds(500, 20, 1000, 30), 'path_length:'),
                    'path-length-value': new Visual.Graphics.Text(new Utils.Bounds(50, 20, 1072, 30), '0', {strokeColor: COLORS.finalPath})
                }
            });

            this._items = items;

            
            this._currentItem = null;
            this._checkedItem = null;
            this._nearestItem = null;
            
            this._isValidForShowDescriptions = false;
            this._distanceY = _DISTANCES_POSITION.y;

            this.reset();
        }

        private get _headersGraphics(): Visual.Graphics.GraphicMap<Items.GraphVertex, Visual.Graphics.Text>{
            return this._getGraphic('headers');
        }

        private get _distancesGraphics(): Visual.Graphics.GraphicCollection<Visual.Graphics.Text>{
            return this._getGraphic('distances');
        }

        private get _lineGraphic(): Visual.Graphics.Line{
            return this._getGraphic('line');
        }

        private get _currentItemDistanceValueGraphic(): Visual.Graphics.Text{
            return this._getGraphic('current-item-distance-value');
        }

        private get _checkedItemDistanceValueGraphic(): Visual.Graphics.Text{
            return this._getGraphic('checked-item-distance-value');
        }

        private get _resultDescriptionGraphic(): Visual.Graphics.Text{
            return this._getGraphic('result-description');
        }

        private get _pathLengthValueGraphic(): Visual.Graphics.Text{
            return this._getGraphic('path-length-value');
        }

        public reset(){
            this._lineGraphic.isVisible = false;
            this._resultDescriptionGraphic.isVisible = false;
            this._pathLengthValueGraphic.isVisible = false;

            this._distanceY = DijkstraGraphicsManager._DISTANCES_POSITION.y;
            this._isValidForShowDescriptions = this._checkValidForShowHeaders();
            
            this._headersGraphics.clear();
            this._distancesGraphics.clear();
        }

        public setCurrentItem(currentItem: Items.GraphVertex, fromItem: Items.GraphVertex | null, distance: number): void;
        public setCurrentItem(currentItem: null): void;

        public setCurrentItem(currentItem: Items.GraphVertex | null, fromItem?: Items.GraphVertex | null, distance?: number){
            if (this._currentItem !== currentItem){
                const {COLORS} = GraphTraversalGraphicsManager;
                
                this.setNearestItem(null);

                if (this._currentItem !== null){
                    this._currentItem.graphicsManager.clearHighlight('vertex');
                    this._headersGraphics.get(this._currentItem)!.strokeColor = Theme.dynamicColor;
                }

                if (currentItem !== null){
                    if (fromItem !== null && fromItem !== undefined){
                        fromItem.graphicsManager.setConnectionStrokeColor(currentItem, COLORS.ready);
                    }

                    currentItem.graphicsManager.strokeWidth = 2;
                    currentItem.graphicsManager.strokeColor = COLORS.current;

                    this._headersGraphics.get(currentItem)!.strokeColor = COLORS.current;
                    this._currentItemDistanceValueGraphic.text = String(distance);
                }

                this._currentItem = currentItem;
            }
        }

        public setCheckedItem(item: Items.GraphVertex | null){
            if (this._checkedItem !== item){
                if (this._checkedItem !== null){
                    if (this._currentItem !== null && this._currentItem.checkConnection(this._checkedItem)){
                        this._currentItem.graphicsManager.setConnectionStrokeColor(this._checkedItem, Theme.dynamicColor);
                    }

                    this._checkedItem.graphicsManager.clearHighlight('vertex');
                    this._headersGraphics.get(this._checkedItem)!.strokeColor = Theme.dynamicColor;
                }

                if (item === null){
                    this._checkedItemDistanceValueGraphic.text = 'INF';
                }
                else{
                    item.graphicsManager.strokeColor = GraphTraversalGraphicsManager.COLORS.check;
                    this._headersGraphics.get(item)!.strokeColor = GraphTraversalGraphicsManager.COLORS.check;
                }

                this._checkedItem = item;
            }
        }

        public setNearestItem(item: Items.GraphVertex | null){
            if (this._checkedItem === item && this._nearestItem !== item){
                this.setCheckedItem(null);

                if (this._nearestItem !== null){
                    this._nearestItem.graphicsManager.clearHighlight('vertex');
                    this._headersGraphics.get(this._nearestItem)!.strokeColor = Theme.dynamicColor;
                }

                if (item !== null){
                    item.graphicsManager.strokeColor = GraphTraversalGraphicsManager.COLORS.next;
                    this._headersGraphics.get(item)!.strokeColor = GraphTraversalGraphicsManager.COLORS.next;
                }

                this._nearestItem = item;
            }
        }

        public setReadyItem(item: Items.GraphVertex){
            if (this._currentItem === item){
                this.setCurrentItem(null);
            }

            item.graphicsManager.strokeColor = GraphTraversalGraphicsManager.COLORS.ready;
            this._headersGraphics.get(item)!.strokeColor = GraphTraversalGraphicsManager.COLORS.ready;
        }

        public strokeCheckedItemConnectFrom(item: Items.GraphVertex){
            if (this._checkedItem === null){
                throw new Errors.DesignError('Неможливо обвести з\'єднання до елементу, що перевіряється, оскільки він не був визначений.');
            }

            item.graphicsManager.setConnectionStrokeColor(this._checkedItem, GraphTraversalGraphicsManager.COLORS.check);
        }

        public wrapToNextLine(){
            this._distanceY += DijkstraGraphicsManager._ITEMS_MARGIN.y;
        }

        public showCheckedItemDistance(distance: number | null){
            this._checkedItemDistanceValueGraphic.text = String(distance).toLocaleUpperCase();
        }

        public showHeaders(){
            const {_HEADERS_POSITION, _ITEMS_MARGIN, _ITEMS_SIZE} = DijkstraGraphicsManager;
            const position = _HEADERS_POSITION.copy();

            this._lineGraphic.isVisible = this._isValidForShowDescriptions;

            for (const item of this._items){
                const graphic = new Visual.Graphics.Text(new Utils.Bounds(_ITEMS_SIZE as Utils.Vector, position), item.title);
                graphic.isVisible = this._isValidForShowDescriptions;
                
                position.x += _ITEMS_MARGIN.x;

                this._headersGraphics.set(item, graphic);
            }
        }

        public showDistance(item: Items.GraphVertex, distance: number | null){
            const {_ITEMS_MARGIN, _ITEMS_SIZE, _DISTANCES_POSITION} = DijkstraGraphicsManager;

            const stringifyDistance = String(distance ?? '');
            const index = this._items.indexOf(item);
            const position = new Utils.Vector(_DISTANCES_POSITION.x + _ITEMS_MARGIN.x * index, this._distanceY);
            const graphic = new Visual.Graphics.Text(new Utils.Bounds(_ITEMS_SIZE as Utils.Vector, position), stringifyDistance, {isVisible: this._isValidForShowDescriptions});

            this._distancesGraphics.add(graphic);
        }

        public showPath(startItem: Items.GraphVertex, lastItem: Items.GraphVertex, path: Commands.DijkstraCommandPathType){
            const {COLORS} = GraphTraversalGraphicsManager;
            const lastStep = path.get(lastItem);

            let currentItem = lastItem;
            let previousItem = lastStep?.from;

            this._resultDescriptionGraphic.isVisible = true;
            this._strokeVerticesAsNotFinalPath();

            if (lastStep === undefined && startItem !== lastItem){
                this._resultDescriptionGraphic.text = 'Шляху між вказаними вершинами не існує.';
                this._resultDescriptionGraphic.strokeColor = COLORS.block;

                currentItem.graphicsManager.strokeColor = COLORS.block;
            }
            else{
                this._resultDescriptionGraphic.text = 'path_length:';
                this._resultDescriptionGraphic.strokeColor = Theme.dynamicColor;

                this._pathLengthValueGraphic.isVisible = true;
                this._pathLengthValueGraphic.text = String(lastStep?.distance ?? 0);

                this._headersGraphics.get(startItem)!.strokeColor = COLORS.finalPath;
                this._headersGraphics.get(lastItem)!.strokeColor = COLORS.finalPath;

                startItem.graphicsManager.strokeWidth = 2;
                startItem.graphicsManager.strokeColor = COLORS.finalPath;

                lastItem.graphicsManager.strokeWidth = 2;
                lastItem.graphicsManager.strokeColor = COLORS.finalPath;
            }
            
            while (previousItem !== undefined){
                previousItem.graphicsManager.strokeWidth = 2;
                previousItem.graphicsManager.strokeColor = COLORS.finalPath;
                previousItem.graphicsManager.setConnectionStrokeWidth(currentItem, 2);
                previousItem.graphicsManager.setConnectionStrokeColor(currentItem, COLORS.finalPath);
                
                currentItem.graphicsManager.strokeWidth = 2;
                currentItem.graphicsManager.strokeColor = COLORS.finalPath;

                currentItem = previousItem;
                previousItem = path.get(currentItem)?.from;
            }
        }

        private _checkValidForShowHeaders(): boolean{
            if (this._items.length > 10){
                return false;
            }

            for (const item of this._items){
                if (item.title.length > 1){
                    return false;
                }
            }

            return true;
        }

        private _strokeVerticesAsNotFinalPath(){
            const {COLORS} = GraphTraversalGraphicsManager;

            for (const startItem of this._items){
                startItem.graphicsManager.strokeWidth = 1;
                startItem.graphicsManager.strokeColor = COLORS.notFinalPath;

                for (const [lastItem] of startItem.getConnections().from){
                    startItem.graphicsManager.setConnectionStrokeWidth(lastItem, 2);
                    startItem.graphicsManager.setConnectionStrokeColor(lastItem, COLORS.notFinalPath);
                }
            }
        }
    }
}