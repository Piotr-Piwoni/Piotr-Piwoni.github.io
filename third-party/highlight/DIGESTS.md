## Subresource Integrity

If you are loading Highlight.js via CDN you may wish to use [Subresource Integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) to guarantee that you are using a legimitate build of the library.

To do this you simply need to add the `integrity` attribute for each JavaScript file you download via CDN. These digests are used by the browser to confirm the files downloaded have not been modified.

```html
<script
  src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/highlight.min.js"
  integrity="sha384-5xdYoZ0Lt6Jw8GFfRP91J0jaOVUq7DGI1J5wIyNi0D+eHVdfUwHR4gW6kPsw489E"></script>
<!-- including any other grammars you might need to load -->
<script
  src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/languages/go.min.js"
  integrity="sha384-HdearVH8cyfzwBIQOjL/6dSEmZxQ5rJRezN7spps8E7iu+R6utS8c2ab0AgBNFfH"></script>
```

The full list of digests for every file can be found below.

### Digests

```
sha384-Mrh0Bn5Cr9xsoNJZxsrQEC60o6IywNDXtujUyD6T4QpNC1zUx063VR8XgFBmdTk1 /es/languages/autohotkey.js
sha384-KmgS3OVfpMEpVcANzQ7xAeLXR4gnymof90LNn09kuu78XoKmam7a4ElcX2Xl+u5M /es/languages/autohotkey.min.js
sha384-gRTR/fmk+6+ygbihH/fJvHgmffnOrd/eO7DW5zgu1uN9GBohtDx+OBs0DI0ejigB /es/languages/bash.js
sha384-Pg7b9hYE6kefjcNqAabhv8jOLCVoZubUaM4bZFjUJd0CaaQ14ksDI0GVllMtAF4S /es/languages/bash.min.js
sha384-xhohaHGp8S443Qn4JZUYAcKqIIl0bQkFA79EUxpbX8GWb5oufdvvSI9ipl/Dasev /es/languages/c.js
sha384-xaTVEdq02jgKStoYDcZD8NhTN1XV/TWpIu4OM53MtMiLl08+e9YJNENo+R/6Nwp0 /es/languages/c.min.js
sha384-4Jkc+l0njgG1ekq/E7kJCYXltFaDopM/LQLUyoCpBGa7oWSdgQzWPXqFxZWXsyRI /es/languages/cmake.js
sha384-7HLwuzaDtJxWvaGQ7qGwWFgozJH1ljKCOPmIVeVosrCZ8RpzoA1wEF/6RSqDKyeP /es/languages/cmake.min.js
sha384-rFCBWxbZHxZD51qKR2cdayIcKUSHS3p1PWPIs1kjgsP7lu9ZP32ah/2DoQUm/rTg /es/languages/cpp.js
sha384-+1Koxl0St78gEZW5CpFK+dbLp7yNsfwLzzQUsSGimV4k/RVJUz6YvqtsqtdbJyKf /es/languages/cpp.min.js
sha384-0s8f7nphuRu8IIkFNCeOVZhvbjt7YKZEHl38OjfkCkdtnwIUvwRNbxxUHkCdcYjm /es/languages/csharp.js
sha384-xLfGW0hIBHie9xNFuVroNihI0BdEO8FKxOeCdyJBrO1eM7s5BsQ8F3fLtFydQZ+Z /es/languages/csharp.min.js
sha384-Gmvct15f4Mo9AXQG5bk5w78N1YjBLXXU3KIV7no+mOVnApXlwfw1dwjfueAwljIV /es/languages/css.js
sha384-1D7DbOic0Z5nM2ldSO9O/EsBfsg/5x7X7So1qnMgscI2ucDevptcg7cTvrD9rL0D /es/languages/css.min.js
sha384-HSr+TD3IkBbR0oASHT5rysX8q2MUc+g5O7+hCWJn5YqXZo0FxtlZ8tVzS10o5zjW /es/languages/glsl.js
sha384-BAQNawDeoCUPCZWWabbjBwXCREsauI9uBgfmsygn0IxSgWsk3mnYN0rssUPupU4s /es/languages/glsl.min.js
sha384-uC39e4pRTIrenlpo9NQf2taOPhdRJNaZLFASSg+Q8BLjYqLXvxL8brjzQmJEQ0qn /es/languages/http.js
sha384-36ZwsK42N/jk3DquJeJr/r/oziBOtUxBcg0ZdTaaEDX+Zo/UMgBP4S2Sf4NEyq1y /es/languages/http.min.js
sha384-g7t9fKR5Tvod4iWv7BQXN+/JMn5GT9sD6FG3h7Fgl+KCv5k4NnnCzEqUe7BMJ9Mv /es/languages/javascript.js
sha384-f7huPivS1dV2T5V+g0aJpgsY7WBHWCsioIq30tpNoXGizD65fWJYGuXXVPNI52VB /es/languages/javascript.min.js
sha384-8CRS96Xb/ZkZlQU+5ffA03XTN6/xY40QAnsXKB0Y+ow1vza1LAkRNPSrZqGSNo53 /es/languages/json.js
sha384-UHzaYxI/rAo84TEK3WlG15gVfPk49XKax76Ccn9qPWYbUxePCEHxjGkV+xp9HcS/ /es/languages/json.min.js
sha384-Ap4gnRYGNAeKXru7neutEvzrhsYnnP1suT5zxW2zdmv6rCl43QzqqLEJ1F3kZWWm /es/languages/latex.js
sha384-bx4oC5pPCnrSzdPzDg3L9UsoJWiptFFwoGWKup6bRk82EzPFrquQa7T7I9iDwnXa /es/languages/latex.min.js
sha384-5TnIBSbRIGDilxscXgaTNLZ8PZ9u7TEBPzF8b9z+wrbTN3e89MbD9zSSuDVdbDFj /es/languages/lua.js
sha384-HCBq0pjgKyOc3FNX31to33MxfNYza3HCbHLfWwdsnkH5r/VmmXTlRrvWSHTJyYvA /es/languages/lua.min.js
sha384-+KkqXkoHKtuOmUzhZ0BjyV0qjljnS+z6i4fELMEg5brFPtmDIog4zZMhylaBTsVi /es/languages/markdown.js
sha384-E7UvgBH6skA1FIOcn3B2c68GtJzrmZlOOC5p/fsxwihTZG/bBedJZu5PC1+kGX7q /es/languages/markdown.min.js
sha384-JoTXwNHosdzUqxg9EepqeL0yHV98o2Fy7EwTtN9awR+5d8T1EQRXmpdHjpRjxkUM /es/languages/objectivec.js
sha384-IA3s+KMOVf9zn8hH1+u4PCkGcunD2O3mNj4y10RDG/Wq7Gs7QWgiH6o01bjXeU1b /es/languages/objectivec.min.js
sha384-i6sPjmXfHWLljAXTYYk0vBOwgsUnUKnKXKH41qzc9OMhaf5AFZqXH7azX4SYdUiR /es/languages/plaintext.js
sha384-OOrQLW97d+/1orj9gjftwbbQyV8LNAcgagqVKBhUYA08Hdi5w0p6VoB3yt2k7gnG /es/languages/plaintext.min.js
sha384-R7N9ng1N/Cb7RLskF1tB8AWD6kKnUs3LXqrJTj0aTGGXswS2sWq/XFUWPpEKSxqu /es/languages/powershell.js
sha384-GZl3J+HUi40wO5QngTvTpHXB0M2gGDnn9E/MyHRRS4VEWDNCS96bODclYTX3/JId /es/languages/powershell.min.js
sha384-Cmq5lORXzyHraasLNqmfchH07JRXyEmjDF+j6tSggoXjYHwtgX/ySW6kkRytM5uu /es/languages/python.js
sha384-ZV5sgX70bBgLkDR5Mtox5UsbJedBc39hRKPdvTw6miK4lSkE/wv94cLY2iyZb/sB /es/languages/python.min.js
sha384-JFRCn12yvr0NDhxPY8oZDk/G2Tjm7bGmqXy28Y0bq4J7D8mKha6jQJOXMB5wtTVr /es/languages/rust.js
sha384-JbkB8w/DGGyx29PIwSq8c/ZeiJB9T/X4mVAZFEyBiNlEAas98Q2NxpBPUlNIlE71 /es/languages/rust.min.js
sha384-R67rULqIohpEyV6aFbjxRv7xhK8v/KteX4cvOFmPcnZ2MTf65Zua+2DzB9MqqXuO /es/languages/scss.js
sha384-WMy5VYgOMFAnHhPJXVDCQ/Y/QPlUrBqNVPtFH6/gGg2F4uaAowyQ0y/9zWEeGpJe /es/languages/scss.min.js
sha384-1mmBZmAs44b6FtD9wpMiLJa8bLZgZv9xoAhngN6B5Q22y9CtcsU2lat0zlRtyVgy /es/languages/shell.js
sha384-u9PV7oWG/lZlm+GnftX7kn0w4b8rRfFxSv5SmJJPHWKGI03rz6VLqgZdQ1B5ez6b /es/languages/shell.min.js
sha384-Z61gsCS2W7Q+3fT1fdya/Sz4wlmsotT9iEGzgIlNqP0soaKH1NzysutxWp08Hh3E /es/languages/typescript.js
sha384-Tv4mr9B7b+x2IynRXW/xcAxUj1+AoN9zyp0n9BWE1Nle3Zfm/zUeEztNLhIRjgE7 /es/languages/typescript.min.js
sha384-BUf3LQCyA1W0AggXd23Sd5S8mf9Bfy87Lfo0l8DYF92VoNcJXk8ShM8BjJ4X3AeM /es/languages/vim.js
sha384-RoYI/9AQK5AF2G++68SRqb7LiSal0kL5sm7eTfGI+cvx1PaJDbLr846Xz+Y1IZ4N /es/languages/vim.min.js
sha384-9ECFzM+oWDye4s/MFx3QUXGo4mW43+SyLpWUDeQtWup6GZJ+KHFxVS89PmZt/fzl /es/languages/xml.js
sha384-PQrsaWeWrBiE1CFRw8K335CaJuQRTjDGm73vn8bXvlwaw6RyqWObdvMTBS8B75NN /es/languages/xml.min.js
sha384-7HTgKp/l2rzlyrh5vUfbfZVy+Wx1lKO4iGmfqvakienApv21u55lo+Vi+iVg4jY0 /es/languages/yaml.js
sha384-4smueUtgWTorlNLbaQIawnVCcIAuw82NetPOGWN5PbZT/pMr0rjvZXj0EUzJV1nr /es/languages/yaml.min.js
sha384-Ky6194KGx4W7WqDV3t88kRxS6urkIlGpVo5yrxcoOKKe7SQqEPHyBRTesjnZYdeB /languages/autohotkey.js
sha384-uKoJCgVgVJP6fShoFeJyzhGcIcuK0GR1MhUeOkp8ku0LWJVxmaqf1LKmGC3VrAO5 /languages/autohotkey.min.js
sha384-Jrkpn2hK0TY04skYBXB9fj7mMpKYy7g726cPwXGXf6mdBXnFlTDXFduxikMCRXT7 /languages/bash.js
sha384-BbT8tZtvkh8HPXIvL5RtzuljBwI3gR5KIdYxZyYSyI5C/+KNAGdzAiexvmxuroag /languages/bash.min.js
sha384-lAz0Eyld5DmFJB7cxaZonrkUJzGefh+K3niV5d7+vzzS7/P7FEeCJeLNXzMjeo+N /languages/c.js
sha384-tMmX0hBMZeMrZhX6dUNxA94/DNJLl70ao6qu2N9+b/6Ep9Y2e1pBzVjxtLygIB+d /languages/c.min.js
sha384-tz8sDBcGyDfVGZQ9FUAKB4eJnNPu9yXGT0lMmnjqQR8IK9WLxlGFllFwPSZUAoH/ /languages/cmake.js
sha384-PInWnmju5g7EmUG5eiPVUat7Psw4dFOQZCNdSV5R/HgXYI+6efBY9fTv+Ye9+kwq /languages/cmake.min.js
sha384-Z5Ja/rxBluJ4iPYwJYn2numfw2XFmlp3qLL1aJ1SZqyTjKWwMh9yWfpNCOqf3vAm /languages/cpp.js
sha384-B711MHXDqRvH/pKkxJk84RyRt9g0qyAJFsu2XukZKoCdnEiBmA6Aq9fO23ZCS7qk /languages/cpp.min.js
sha384-NTF0oluJbKDCxwGTujk+IsRQRbf+waUyDilA5GhOA+VSoxhyApQpmDWMjxfFO3dt /languages/csharp.js
sha384-Z+o7SU/ldIEIdOIqpMV+9s2n8EE1rZTFSRv5Sd7rlaSoPTpyflmmZ/oRb6ycw/2s /languages/csharp.min.js
sha384-bsb3QmLtUiyaiHwtrL4YoAVI9yLsjyqxgoAsk4Zd+ass9rSK1WWRiCDSu/hm8QRp /languages/css.js
sha384-0XGvxIU7Oq1DQMMBr1ORiozzBq3KpZPE/74mJysWRBAop1dZ9Ioq/qRWe8u30Ded /languages/css.min.js
sha384-LGEW2yNxgENy35/TFa2DmM11QU/stRuw69epbr0GP5zvUbi7ddUFMeW6UB45yF0P /languages/glsl.js
sha384-55RCrjtjoduGgxOrAm5xxwlpSaef1T4sAUbyj0QiAl246lH+ZlanDaelryeGI/yO /languages/glsl.min.js
sha384-hV7ok3wrc7DrjvcAtn3jI6KlZtpbm+hC4HXrOyRjrl65HjGtTJ5ixGiMSpJRDiDq /languages/http.js
sha384-X50fiL5mByDvJRwn0hkUXIEttF5t8hlEFSPUMq42KoryxgI4niflBsviuhahhWJf /languages/http.min.js
sha384-yxv7Fv9ToggiLsR67t98hV5ZRup6XX6xL1Rkbi/cGV5J8y7fosCi9POqlBkiBWFg /languages/javascript.js
sha384-tPOrIubtDHoQU7Rqw0o88ilthGO0/4xEZGB47XrQKWhrc1/SchwsDx+AP74u4nk0 /languages/javascript.min.js
sha384-pUlqdjoNePvHvdi7GVKJJnh/P2T3EvXXodl5j0JtTkbNC4DRH7gwGbcHFa84bFOP /languages/json.js
sha384-3C+cPClJZgjKFYAb0bh35D7im2jasLzgk9eRix3t1c5pk1+x6b+bHghWcdrKwIo3 /languages/json.min.js
sha384-gC1LLqQxzTtslF1/nhSmFhIyScy7u0VnfVPDE45XlK+Ed/wgeOK0zae/DRDGNTDs /languages/latex.js
sha384-A8E38+eenPg19mMk5Ikv1fetaPL/yA2OsGR3hFs9TeeBX+zQ8u5bZNsPKmlFHwN4 /languages/latex.min.js
sha384-IQZHDTDQQ0zpXf1FfEYOFIfjZrBbLbNXYCn4zukU6u9mLf6JI36vvIRaV6/d175T /languages/lua.js
sha384-dbTI+BVfiAlIfjWMYrH83f/x/GYSKbujaX4g4F7q5YxbGtlS7qTLcwBQQvDdsGf6 /languages/lua.min.js
sha384-Sk9XW/OOutdl6KS1M9Wson0imuqr0LkpoTRDHi5QFH4MWe0aViI5d86BOVkh8Ds0 /languages/markdown.js
sha384-Rv26WbhHH4MDPzeExq4ECmZUYF942tlfVhqA91Drw1P+Ey55KjihLF9RJENxjWr1 /languages/markdown.min.js
sha384-hpU4KjKsUFgTYugJheYLkhFIEvecxLYra9Fg0ptjxqCxlUyMCJirJD/2IQDjZihD /languages/objectivec.js
sha384-azcLq84HapvEpXsDDJ2m1n7KovejGjCdGV4Ilw9xlcb6Yg2EyGNVr5dHZyoLdVDw /languages/objectivec.min.js
sha384-MZKv9uidO1+VnHz8xWxPv6ACuLO5t823eanvTcKYnmi/ocdVYD8zKZNTxmF0nKEM /languages/plaintext.js
sha384-Z9EdtPaC8UiXHEq1WuQTdvqT+FwjLwaVTIwTCZW/dGfiU9nbF8Shvltrhqtw83Qb /languages/plaintext.min.js
sha384-IovgHYXogGBldWibmA9aDifITNGdjEeaRUjvsJ3l4Rf4LVusXXcOZUCSxBEhXWqY /languages/powershell.js
sha384-q/8iVbv95DiFN+l7qeoBwJ0Wju7gozJemMfG3DdxiOR8CfA/2dKvKA3W5t4l/n9t /languages/powershell.min.js
sha384-ueSSFZFqg7cVD0dpEqIk9EefJiJUYan0PH6I8u/p+bNLLx7dMs4J2keMaFXqCN8P /languages/python.js
sha384-eXRt+aAa2ig1yFVDQCLis8k9s/1dikTcigj+/R07yNdIxc8BAG/b1uHDyEW3of17 /languages/python.min.js
sha384-4hMItQrXDnquJWRbDiZ+cP4udu1pcJlCVFg3Ytv9OgWNbpIwzizsWbIwzA1BAJrI /languages/rust.js
sha384-kENps59cKQW5DV3vOEzpSp6tfGzWGpPYKz748i4gGziVSjieRtupNNu/WEwG3s8n /languages/rust.min.js
sha384-e5MJZgawCv4c+BexmFUMVQU6dLcIOXdieG/a1FPCIgnlGfBIEUUcFMMo+UrKMOtN /languages/scss.js
sha384-BYdYy4D3IX6eNNlKqsviUjxC6EqavvNwCVDMzmie3QXyArWdCQf+VvvFo4ciaNaW /languages/scss.min.js
sha384-BanM6jNzM3hgNw0Vu3gSe58a3MK3PSlMUzh5s8QaaDzIvTWgB0jNetV3rNxteKHy /languages/shell.js
sha384-mSZF08WaP0Llc4GMwE0KA2V9yfZQimO5PvfcXf2AATDdqri3Q7IdV7pfbhVPJCHV /languages/shell.min.js
sha384-8v3YMaXFO9cmTNxsHWqwn9wJsV1jVO7rwx4huxqlEQpT/P2tuDbtm+Hs0EdYqu0a /languages/typescript.js
sha384-df1w1nJ43GNwmgbSCrT8YFIYyqFAm+lzj+b6ofuziX8Cfdg9QHFwbORDgAaj//wi /languages/typescript.min.js
sha384-mq0tB6BMUaygd1/gw1OWkOWuTdZHYi1F3+JIKBvfmigeIWRCyE1K6SlPoeQkfrXe /languages/vim.js
sha384-VlQzka731dwu27YSdIJ3tZrqCAmRLQx0FdETJM+V77rW7mxiFH+uR26/E0njLbkd /languages/vim.min.js
sha384-Pgzg6a405W6U1xFjjSs5i8d7V81Tmt/TYn8HFOa+u1psDc8cbs8nC7BuyNXbWWRK /languages/xml.js
sha384-FQjSArDMJE4WMAJGcCNAV+IXIOljcIxM3UFAD2vxjedWmBnnDaAyqRG7AQHf/uM/ /languages/xml.min.js
sha384-6GXi9L5BnOWPU6bzwYL78Zscp23qyDdMLZpZvp4mLzvF2qt0eY/DfsPHiFVXq4hv /languages/yaml.js
sha384-A/iMReLA0Bo3tLydBIoOQXQzYnrwL90jkHYUubrtERUGCbIuU7U0EHge0Xd2s5sr /languages/yaml.min.js
sha384-NSycwtXFUOa2eApq8rpDckXFzchsNTxy2Y/rul5LICaQufq00MCicbn5oLmJ5zXi /highlight.js
sha384-hxcPOcaYSZizfdGwndVAaYPaexMJmCCp95ZIBIOR12TS/lesGpx4MpVDR3pnq98S /highlight.min.js
```

