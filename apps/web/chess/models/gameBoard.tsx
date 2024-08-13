import Chessboard from "chessboardjsx";
import WithMoveValidation from "../engine/moveValidation";


export default function GameBoard() {
	return (
		<div>
			<WithMoveValidation/>
		</div>
	)
}
