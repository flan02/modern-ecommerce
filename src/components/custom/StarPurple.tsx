

type Props = {
  className?: string
}

const StarPurple = (props: Props) => {
  return (
    <svg
      className={props.className}
      width="300" height="150" viewBox="30 0 65 65" xmlns="http://www.w3.org/2000/svg">
      <g transform="rotate(-15)">
        <polygon points="50,15 61,35 85,35 66,50 75,70 50,57 25,70 34,50 15,35 39,35"
          fill="#7C3AED"
          stroke=""
          strokeWidth="2" />
      </g>
    </svg>

  )
}

export default StarPurple