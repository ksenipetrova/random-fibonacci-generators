import scipy.stats as stats

pvalue = 1 - stats.chi2.cdf(x=5.094, df=11)

print pvalue
