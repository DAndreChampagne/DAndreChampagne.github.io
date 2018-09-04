
def fibonacci(n):
    a,b = 0,1

    while a < 10:
        a,b = b,a+b
    return a



print(fibonacci(5))