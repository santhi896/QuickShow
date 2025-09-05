
// const BlurCircle = ({top = "auto", left = "auto" ,right = "auto",bottom = "auto"}) => {
//   return (
//     <div className="absolute -z-50 h-58 w-58 aspect-square rounded-full bg-red/40 blur-3*1"
//      style={{top: top, left: left, right: right, bottom: bottom}}>
      
//     </div>
//   )
// }

// export default BlurCircle

const BlurCircle = ({ top = "auto", bottom = "auto", right = "0", left = "auto" }) => {
  return (
    <div
      className="absolute -z-50 h-56 w-56 rounded-full bg-red-500/40 blur-3xl"
      style={{ top, bottom, right, left }}
    />
  );
};

export default BlurCircle;
