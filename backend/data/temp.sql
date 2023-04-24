with nj as (
select max(quant) as maxNJ, cust, prod
from sales
where sales.state = 'NJ'
group by cust, prod
),
njDate as (
select maxNJ, sales.cust, sales.prod, sales.date
from sales, nj
where sales.state = 'NJ' and sales.cust = nj.cust and sales.prod = nj.prod and sales.quant = maxNJ
),

ny as (
select max(quant) as maxNY, cust, prod
from sales
where sales.state = 'NY'
group by cust, prod
),
nyDate  as (
select maxNY, sales.cust, sales.prod, sales.date
from sales, ny
where sales.state = 'NY' and sales.cust = ny.cust and sales.prod = ny.prod and sales.quant = maxNY
),

ct as (
select max(quant) as maxCT, cust, prod
from sales
where sales.state = 'CT'
group by cust, prod
),

ctDate  as (
select maxCT, sales.cust, sales.prod, sales.date
from sales, ct
where sales.state = 'CT' and sales.cust = ct.cust and sales.prod = ct.prod and sales.quant = maxCT
)

select ctDate.cust, ctDate.prod, maxNJ, njDate.date, maxNY, nyDate.date, maxCT, ctDate.date
from njDate, nyDate, ctDate
where njDate.cust = nyDate.cust and njDate.cust = ctDate.cust and njDate.prod = nyDate.prod and njDate.prod = ctDate.prod and (maxNY > maxNJ or maxNY > maxCT)
order by ctDate.cust, ctDate.prod