// // export type SelectedSurfaceType = {
// //   category?: string;
// //   option?: string;
// //   tile?: string;
// //   color?: string;
// // };
// export type SelectedSurfaceType = {
//   treatment?: string;
//   color?: string;
//   coating?: string;
// };
export type SelectedSurfaceType = {
  treatment?: string;
  color?: string;
  coating?: string;

  // Keep these for backward compatibility
  category?: string;
  option?: string;
  tile?: string;
};
