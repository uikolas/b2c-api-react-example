import { connect } from 'react-redux';


export function reduxify(mapStateToProps: Function, mapDispatchToProps?: Function, mergeProps?: any, options?: any) {
  return (target: any) => (
    connect(mapStateToProps as any, mapDispatchToProps as any, mergeProps, options)(target) as any
  );
}
