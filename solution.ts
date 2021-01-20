type OneEdgeType={
  edgeTypeId:number,
  type: 'outside'|'inside'|string
}
interface IPuzzle{
  id: number 
  edges: { 
      top: OneEdgeType|null,
      left: OneEdgeType|null,
      right: OneEdgeType|null,
      bottom: OneEdgeType|null,
  }
}

function rotatePuzzle(puzzle:IPuzzle):IPuzzle{
  const oldEdges={...puzzle.edges}
  const newEdges={
    top:oldEdges.left,
    left: oldEdges.bottom,
    right: oldEdges.top,
    bottom:oldEdges.right
  }
  const newPuzzle={...puzzle, edges:newEdges}
  return newPuzzle
}

function findNextRightPuzzle(firstPuzzle:IPuzzle, pieces:Array<IPuzzle>){
  const right=firstPuzzle.edges.right.edgeTypeId
  let nextItem=pieces.find(item=>item.edges.left.edgeTypeId===right||item.edges.right.edgeTypeId===right||item.edges.top.edgeTypeId===right||item.edges.bottom.edgeTypeId===right)
  while(nextItem.edges.left.edgeTypeId!==right){
    nextItem=rotatePuzzle(nextItem)
  }
  return nextItem
}

function findFirstPuzzle(underPuzzle:IPuzzle, pieces:Array<IPuzzle>){
  const bottom=underPuzzle.edges.bottom.edgeTypeId
  let nextItem=pieces.find(item=>item.edges.left.edgeTypeId===bottom||item.edges.right.edgeTypeId===bottom||item.edges.top.edgeTypeId===bottom||item.edges.bottom.edgeTypeId===bottom)
  while(nextItem.edges.top.edgeTypeId!==bottom){
    nextItem=rotatePuzzle(nextItem)
  }
  return nextItem
}

function solvePuzzle(pieces:Array<IPuzzle>) {
  const size=Math.sqrt(pieces.length)
  const arr=[]
  let firstPiece={...pieces[0]}
  while(firstPiece.edges.left!==null&&firstPiece.edges.top!==null){
    firstPiece=rotatePuzzle(firstPiece)
  }
  arr.push(firstPiece)
  for (let i=1; i < size; i++) {
    const nextItem=findNextRightPuzzle(firstPiece, pieces)
    arr.push(nextItem)
  }

  return arr;
}

// Не удаляйте эту строку
// window.solvePuzzle = solvePuzzle;
let puzzle3on3=[
  {
    id: 1,
    edges: {
      top: null,
      right: { edgeTypeId: 7, type: "outside" },
      bottom: { edgeTypeId: 5, type: "inside" },
      left: null,
    },
  },
  {
    id: 9,
    edges: {
      top: { edgeTypeId: 8, type: "inside" },
      right: { edgeTypeId: 15, type: "inside" },
      bottom: null,
      left: { edgeTypeId: 5, type: "outside" },
    },
  },
  {
    id: 5,
    edges: {
      top: null,
      right: { edgeTypeId: 2, type: "inside" },
      bottom: { edgeTypeId: 1, type: "inside" },
      left: null,
    },
  },
  {
    id: 4,
    edges: {
      top: { edgeTypeId: 34, type: "inside" },
      right: { edgeTypeId: 11, type: "outside" },
      bottom: { edgeTypeId: 7, type: "inside" },
      left: null,
    },
  },
  {
    id: 3,
    edges: {
      top: { edgeTypeId: 2, type: "outside" },
      right: null,
      bottom: { edgeTypeId: 4, type: "outside" },
      left: { edgeTypeId: 6, type: "inside" },
    },
  },
  {
    id: 2,
    edges: {
      top: { edgeTypeId: 3, type: "outside" },
      right: { edgeTypeId: 34, type: "outside" },
      bottom: null,
      left: null,
    },
  },
  {
    id: 8,
    edges: {
      top: null,
      right: { edgeTypeId: 15, type: "outside" },
      bottom: { edgeTypeId: 4, type: "inside" },
      left: null,
    },
  },
  {
    id: 7,
    edges: {
      top: { edgeTypeId: 3, type: "inside" },
      right: null,
      bottom: { edgeTypeId: 1, type: "outside" },
      left: { edgeTypeId: 10, type: "inside" },
    },
  },
  {
    id: 6,
    edges: {
      top: { edgeTypeId: 11, type: "inside" },
      right: { edgeTypeId: 10, type: "outside" },
      bottom: { edgeTypeId: 6, type: "outside" },
      left: { edgeTypeId: 8, type: "outside" },
    },
  },
]
const result=solvePuzzle(puzzle3on3)
console.log(result);
