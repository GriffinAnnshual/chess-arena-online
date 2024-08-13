"use client"
import React, { Component, ReactNode } from "react";
import PropTypes from "prop-types";
import { Chess, Move, Square } from "chess.js";
import { toast } from "react-hot-toast";
import Chessboard, { Props as ChessboardProps } from "chessboardjsx";

// Toast styles
export const gameToastStyle = {
  style: {
    border: "1px solid #710069",
    padding: "16px",
    color: "#710069",
  },
  iconTheme: {
    primary: "#710069",
    secondary: "#FFFAEE",
  },
};

// Define the types for the component's props and state
interface HumanVsHumanProps {
  children: (props: {
    squareStyles: Record<string, React.CSSProperties>;
    position: string;
    onMouseOverSquare: (square: Square) => void;
    onMouseOutSquare: () => void;
    onDrop: ChessboardProps['onDrop'];
    dropSquareStyle: React.CSSProperties;
    onDragOverSquare: (square: Square) => void;
    onSquareClick: (square: Square) => void;
    onSquareRightClick: (square: Square) => void;
  }) => ReactNode;
}

interface HumanVsHumanState {
  fen: string;
  dropSquareStyle: React.CSSProperties;
  squareStyles: Record<string, React.CSSProperties>;
  pieceSquare: string;
  square: string;
  history: Move[];
}



class HumanVsHuman extends Component<HumanVsHumanProps, HumanVsHumanState> {
  static propTypes = { children: PropTypes.func.isRequired };

  private game: Chess;

  constructor(props: HumanVsHumanProps) {
    super(props);
    this.state = {
      fen: "start",
      dropSquareStyle: {},
      squareStyles: {},
      pieceSquare: "",
      square: "",
      history: [],
    };
    this.game = new Chess();
  }

  componentDidMount() {
    this.game = new Chess();
  }

  removeHighlightSquare = () => {
    this.setState(({ pieceSquare, history }) => ({
      squareStyles: squareStyling({ pieceSquare, history }),
    }));
  };

  highlightSquare = (sourceSquare: Square, squaresToHighlight: Square[]) => {
    const highlightStyles = [sourceSquare, ...squaresToHighlight].reduce(
      (a, c) => {
        return {
          ...a,
          ...{
            [c]: {
              background: "radial-gradient(circle, #E100FF 36%, transparent 40%)",
              borderRadius: "50%",
            },
          },
          ...squareStyling({
            history: this.state.history,
            pieceSquare: this.state.pieceSquare,
          }),
        };
      },
      {}
    );

    this.setState(({ squareStyles }) => ({
      squareStyles: { ...squareStyles, ...highlightStyles },
    }));
  };

  onDrop: ChessboardProps['onDrop'] = ({ sourceSquare, targetSquare }) => {
    try {
      // Validate that sourceSquare and targetSquare are not empty
      if (!sourceSquare || !targetSquare) {
        throw new Error("Invalid move: source or target square is empty.");
      }

      // See if the move is legal
      const move = this.game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q", // always promote to a queen for example simplicity
      });

      // Illegal move
      if (move === null) {
        throw new Error(`Invalid move: { from: ${sourceSquare}, to: ${targetSquare} }`);
      }

      // Update the state
      this.setState(({ history, pieceSquare }) => ({
        fen: this.game.fen(),
        history: this.game.history({ verbose: true }),
        squareStyles: squareStyling({ pieceSquare, history }),
      }));

      // Check for game-over conditions
      if (this.game.isCheckmate()) {
        toast.success("Checkmate! Game over.", gameToastStyle);
      } else if (this.game.isDraw()) {
        toast.success("It's a draw! Game over.", gameToastStyle);
      } else if (this.game.isStalemate()) {
        toast.success("Stalemate! Game over.", gameToastStyle);
      } else if (this.game.isThreefoldRepetition()) {
        toast.success("Threefold repetition! Game over.", gameToastStyle);
      } else if (this.game.isInsufficientMaterial()) {
        toast.success("Insufficient material! Game over.", gameToastStyle);
      }
    } catch (err: any) {
      toast.error(err.message, gameToastStyle);
    }
  };

  onMouseOverSquare = (square: Square) => {
    // Get list of possible moves for this square
    const moves = this.game.moves({
      square,
      verbose: true,
    }) as Move[];

    // Exit if there are no moves available for this square
    if (moves.length === 0) return;

    const squaresToHighlight = moves.map((move) => move.to);
    this.highlightSquare(square, squaresToHighlight);
  };

  onMouseOutSquare = this.removeHighlightSquare;

  onDragOverSquare = (square: Square) => {
    this.setState({
      dropSquareStyle:
        square === "e4" || square === "d4" || square === "e5" || square === "d5"
          ? { backgroundColor: "cornFlowerBlue" }
          : { boxShadow: "inset 0 0 1px 4px rgb(255, 255, 0)" },
    });
  };

  onSquareClick = (square: Square) => {
    this.setState(({ history }) => ({
      squareStyles: squareStyling({ pieceSquare: square, history }),
      pieceSquare: square,
    }));

    const move = this.game.move({
      from: this.state.pieceSquare,
      to: square,
      promotion: "q", // always promote to a queen for example simplicity
    });

    // Illegal move
    if (move === null) return;

    this.setState({
      fen: this.game.fen(),
      history: this.game.history({ verbose: true }),
      pieceSquare: "",
    });

    // Check for game-over conditions
    if (this.game.isCheckmate()) {
      toast.success("Checkmate! Game over.", gameToastStyle);
    } else if (this.game.isDraw()) {
      toast.success("It's a draw! Game over.", gameToastStyle);
    } else if (this.game.isStalemate()) {
      toast.success("Stalemate! Game over.", gameToastStyle);
    } else if (this.game.isThreefoldRepetition()) {
      toast.success("Threefold repetition! Game over.", gameToastStyle);
    } else if (this.game.isInsufficientMaterial()) {
      toast.success("Insufficient material! Game over.", gameToastStyle);
    }
  };

  onSquareRightClick = (square: Square) =>
    this.setState({
      squareStyles: { [square]: { backgroundColor: "deepPink" } },
    });

  render() {
    const { fen, dropSquareStyle, squareStyles } = this.state;

    return this.props.children({
      squareStyles,
      position: fen,
      onMouseOverSquare: this.onMouseOverSquare,
      onMouseOutSquare: this.onMouseOutSquare,
      onDrop: this.onDrop,
      dropSquareStyle,
      onDragOverSquare: this.onDragOverSquare,
      onSquareClick: this.onSquareClick,
      onSquareRightClick: this.onSquareRightClick,
    });
  }
}

const squareStylesColor = {
	white: { backgroundColor: "#ffffff" },
	black: { backgroundColor: "#000000" },
}

export default function WithMoveValidation() {
return (
	<div>
		<HumanVsHuman>
			{({
				position,
				onDrop,
				onMouseOverSquare,
				onMouseOutSquare,
				squareStyles,
				dropSquareStyle,
				onDragOverSquare,
				onSquareClick,
				onSquareRightClick,
			}) => (
				<Chessboard
					id="humanVsHuman"
					width={560}
					position={position}
					onDrop={onDrop}
					onMouseOverSquare={onMouseOverSquare}
					onMouseOutSquare={onMouseOutSquare}
					boardStyle={{
						borderRadius: "5px",
						boxShadow: `0 5px 15px 5px rgba(0, 0, 0, 0.5), 0 0 0 4px white`,
					}}
					squareStyles={(square: string) =>
						parseInt(square[1], 10) % 2 === 0
							? squareStylesColor.white
							: squareStylesColor.black
					}
					dropSquareStyle={dropSquareStyle}
					onDragOverSquare={onDragOverSquare}
					onSquareClick={onSquareClick}
					onSquareRightClick={onSquareRightClick}
				/>
			)}
		</HumanVsHuman>
	</div>
)
}

const squareStyling = ({
  pieceSquare,
  history,
}: {
  pieceSquare: string;
  history: Move[];
}): Record<string, React.CSSProperties> => {
  const sourceSquare = history.length && history[history.length - 1].from;
  const targetSquare = history.length && history[history.length - 1].to;

	return {
		[pieceSquare]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },
		...(history.length && {
			[sourceSquare]: {
				backgroundColor: "rgba(255, 255, 0, 0.4)",
			},
		}),
		...(history.length && {
			[targetSquare]: {
				backgroundColor: "rgba(255, 255, 0, 0.4)",
			},
		}),
	}
}
