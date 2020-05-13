---
id: matrix
title: Glitch in the matrix
sidebar_label: glitch in da matrix
---

## Matrix Multiplication

![matrix mult](/img/mat_mult.png)

Ordered n-tuples are often indicated by a variable with an arrow on top. For example, eg. $\vec{a}=(3,1,8)$

```
// C(m, n) = A(m, k) * B(k, n)
// This actually has pretty bad spatial locality
// as B is being accessed column-wise. (stride-n access!)
for (int i = 0; i < m; i++) {
  for (int j = 0; j < n; j++) {
    for (int p = 0; p < k; p++) {
      C(i, j) += A(i, p) * B(p, j);
    }
  }
}
```

## Links

- [High-Performance Matrix Multiplication](https://gist.github.com/nadavrot/5b35d44e8ba3dd718e595e40184d03f0)
