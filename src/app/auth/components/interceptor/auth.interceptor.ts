import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = sessionStorage.getItem('auth_token');
  console.log('Interceptor ',authToken)


  if (authToken) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });
  }

  console.log("Interceptor Executado");
  return next(req);
};
